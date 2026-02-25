"use client";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "./theme-provider";
import { UnauthenticatedView } from "@/modules/auth/components/UnauthenticatedView";
import { Spinner } from "@/modules/auth/components/AuthLoadingView";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <UnauthenticatedView/>
        </Unauthenticated>
        <AuthLoading>
          <div className="flex items-center justify-center w-full h-full">
            <Spinner className="w-4 h-4" />
          </div>
        </AuthLoading>
      </ThemeProvider>
    </ConvexProviderWithClerk>
  );
};
