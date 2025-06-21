import { NextResponse } from 'next/server';
import { getAuthData } from '@/lib/auth';
export async function GET(request: Request) {
  try {
    const authData = getAuthData();
    if (!authData?.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    if (userId) {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      const user = await response.json();
      return NextResponse.json(user);
    }
    const response = await fetch('https://api.example.com/users');
    const users = await response.json();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
