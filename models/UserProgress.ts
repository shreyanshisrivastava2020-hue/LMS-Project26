import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ILessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  lastWatchedPosition?: number;
  timeSpent?: number;
}

export interface IModuleProgress {
  moduleId: string;
  completed: boolean;
  completedAt?: Date;
  lessons: ILessonProgress[];
  progress: number;
}

export interface IUserProgress extends Document {
  userId: string;
  courseId: string;

  overallProgress: number;
  isCompleted: boolean;
  completedAt?: Date;

  enrolledAt: Date;
  lastAccessedAt: Date;

  modules: IModuleProgress[];
  completedLessons?: string[]; // array of lesson IDs


  totalTimeSpent: number;
  currentModuleId?: string;
  currentLessonId?: string;

  certificateIssued: boolean;
  certificateUrl?: string;
  certificateIssuedAt?: Date;

  notes?: { lessonId: string; content: string; createdAt: Date }[];

  calculateProgress(): void;
  completeLesson(moduleId: string, lessonId: string): void;
  updateLastAccessed(): void;
}

// Schemas
const LessonProgressSchema = new Schema<ILessonProgress>({
  lessonId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  lastWatchedPosition: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
});

const ModuleProgressSchema = new Schema<IModuleProgress>({
  moduleId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  lessons: [LessonProgressSchema],
  progress: { type: Number, default: 0, min: 0, max: 100 },
});

const UserProgressSchema: Schema<IUserProgress> = new Schema(
  {
    userId: { type: String, required: true, index: true },
    courseId: { type: String, required: true, index: true },

    overallProgress: { type: Number, default: 0, min: 0, max: 100 },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },

    enrolledAt: { type: Date, default: Date.now },
    lastAccessedAt: { type: Date, default: Date.now },

    modules: [ModuleProgressSchema],

    totalTimeSpent: { type: Number, default: 0 },
    currentModuleId: { type: String },
    currentLessonId: { type: String },

    certificateIssued: { type: Boolean, default: false },
    certificateUrl: { type: String },
    certificateIssuedAt: { type: Date },

    notes: [
      {
        lessonId: String,
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Indexes
UserProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
UserProgressSchema.index({ lastAccessedAt: -1 });

// Methods
UserProgressSchema.methods.calculateProgress = function () {
  if (!this.modules || this.modules.length === 0) {
    this.overallProgress = 0;
    return;
  }

  let totalLessons = 0;
  let completedLessons = 0;

  // Explicitly type m and l
  this.modules.forEach((m: IModuleProgress) => {
    m.lessons.forEach((l: ILessonProgress) => {
      totalLessons++;
      if (l.completed) completedLessons++;
    });

    m.progress =
      m.lessons.length > 0
        ? Math.round(
            (m.lessons.filter((l: ILessonProgress) => l.completed).length / m.lessons.length) * 100
          )
        : 0;
    m.completed = m.progress === 100;
  });

  this.overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (this.overallProgress === 100 && !this.isCompleted) {
    this.isCompleted = true;
    this.completedAt = new Date();
  }
};

UserProgressSchema.methods.completeLesson = function (moduleId: string, lessonId: string) {
  const module = this.modules.find((m: IModuleProgress) => m.moduleId === moduleId);
  if (!module) return;

  const lesson = module.lessons.find((l: ILessonProgress) => l.lessonId === lessonId);
  if (!lesson || lesson.completed) return;

  lesson.completed = true;
  lesson.completedAt = new Date();

  this.calculateProgress();
};

UserProgressSchema.methods.updateLastAccessed = function () {
  this.lastAccessedAt = new Date();
};

UserProgressSchema.pre<IUserProgress>('save', async function () {
  if (this.isModified('modules')) {
    this.calculateProgress();
  }
  // no next() needed in async hooks
});


/*
// Pre-save hook
UserProgressSchema.pre('save', function (next: HookNextFunction) {
  if (this.isModified('modules')) this.calculateProgress();
  next();
});
*/
// Export model
const UserProgress: Model<IUserProgress> =
  mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);

export default UserProgress;
