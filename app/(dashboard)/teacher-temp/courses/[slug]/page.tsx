interface Props {
  params: {
    slug: string;
  };
}

export default function CourseManagePage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Manage Course: {params.slug}
      </h1>

      <div className="mt-6 flex gap-6 border-b pb-2">
        <button>Overview</button>
        <button>Modules</button>
        <button>Settings</button>
      </div>

      <div className="mt-6">
        {/* Here you show modules and lessons */}
      </div>
    </div>
  );
}