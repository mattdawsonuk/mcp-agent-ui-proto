export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export const mockUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Mark Sullivan',
  email: 'mark.sullivan@wilmingtonplc.com',
  role: 'admin',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
}; 