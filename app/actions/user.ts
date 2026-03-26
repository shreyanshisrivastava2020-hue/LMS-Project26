'use server';

import connectDB from '@/app/lib/auth/mongodb';
import User, { IUser } from '@/models/User';
import Subscription from '@/models/Subscription';
import Course from '@/models/Course';
import UserProgress from '@/models/UserProgress';

/* ===================== TYPES ===================== */

interface SyncUserData {
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

/* ===================== SYNC USER ===================== */

export async function syncUserToDatabase(userData: SyncUserData) {
  if (!userData.email) {
    return { success: false, message: 'Email is required' };
  }

  try {
    await connectDB();

    let user = await User.findOne({ email: userData.email });

    if (user) {
      user.firstName = userData.firstName ?? user.firstName;
      user.lastName = userData.lastName ?? user.lastName;
      user.imageUrl = userData.imageUrl ?? user.imageUrl;

      await user.save();

      return { success: true, message: 'User updated successfully', user };
    }

    user = new User({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      imageUrl: userData.imageUrl,
      role: 'student', // default role
    });

    await user.save();

    return { success: true, message: 'User created successfully', user };
  } catch (error) {
    console.error('User sync error:', error);
    return { success: false, message: 'Failed to sync user' };
  }
}

/* ===================== LIST USERS WITH SUBSCRIPTION ===================== */

export async function listUsersWithSubscription() {
  try {
    await connectDB();

    const users = await User.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'subscriptions',
          localField: '_id',
          foreignField: 'userId',
          as: 'subscriptions',
        },
      },
      {
        $addFields: {
          subscriptionStatus: {
            $cond: [
              { $gt: [{ $size: '$subscriptions' }, 0] },
              { $arrayElemAt: ['$subscriptions.status', 0] },
              'none',
            ],
          },
        },
      },
    ]);

    return { success: true, users };
  } catch (error) {
    console.error('List users error:', error);
    return { success: false, error: 'Failed to list users' };
  }
}

/* ===================== GET RECENT USERS ===================== */

export async function getRecentUsers(limit = 5) {
  try {
    await connectDB();

    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(); // use lean() for faster read-only docs

    return { success: true, users };
  } catch (error) {
    console.error('Get recent users error:', error);
    return { success: false, error: 'Failed to fetch recent users' };
  }
}

/* ===================== ADMIN DASHBOARD DATA ===================== */

export async function getAdminDashboardData() {
  try {
    await connectDB();

    const [
      totalUsers,
      totalCourses,
      totalEnrollments,
      completedEnrollments,
      completedSubs,
      pendingSubs,
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      UserProgress.countDocuments(),
      UserProgress.countDocuments({ isCompleted: true }),
      Subscription.countDocuments({ status: 'completed' }),
      Subscription.countDocuments({ status: 'pending' }),
    ]);

    return {
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalEnrollments,
        completedEnrollments,
        completedSubs,
        pendingSubs,
      },
    };
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return { success: false, error: 'Dashboard fetch failed' };
  }
}
