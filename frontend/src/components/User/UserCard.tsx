interface UserCardProps {
  email: string;
  firstName: string;
  profilePicture?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  email,
  firstName,
  profilePicture,
}) => (
  <div>
    <img
      src={profilePicture || "/assets/default_avatar.png"}
      alt={firstName}
      width={48}
    />
    <div>{firstName}</div>
    <div>{email}</div>
  </div>
);

export const mockUserCardData: UserCardProps[] = [
  {
    email: "alice@example.com",
    firstName: "Alice",
    profilePicture: "/assets/alice_avatar.png",
  },
  {
    email: "bob@example.com",
    firstName: "Bob",
    profilePicture: "/assets/bob_avatar.png",
  },
];

// Usage example
// <UserCard {...mockUserCardData[0]} />
