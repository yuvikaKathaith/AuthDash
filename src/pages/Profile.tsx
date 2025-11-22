import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="space-y-6">
      {/* ...existing profile UI... */}

      <div className="pt-6">
        <Button
          variant="destructive"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;