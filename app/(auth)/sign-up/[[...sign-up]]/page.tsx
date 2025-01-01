import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md z-10">
        <SignUp
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
