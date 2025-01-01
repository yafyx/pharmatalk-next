import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full flex items-center justify-center p-4 bg-white min-h-screen">
      <div className="w-full max-w-md z-10">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-lg rounded-lg",
            },
          }}
        />
      </div>
    </main>
  );
}
