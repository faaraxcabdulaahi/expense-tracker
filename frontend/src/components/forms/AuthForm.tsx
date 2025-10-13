// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import {
//   loginSchema,
//   registerSchema,
// } from "../../utils/validation";
// import { z } from "zod";

// // ✅ Derive types directly from schemas for type safety
// type LoginFormData = z.infer<typeof loginSchema>;
// type RegisterFormData = z.infer<typeof registerSchema>;

// interface AuthFormProps {
//   type: "login" | "register";
//   onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>;
//   isLoading: boolean;
// }

// export function AuthForm({ type, onSubmit, isLoading }: AuthFormProps) {
//   const isLogin = type === "login";

  

//   // ✅ Pick correct schema & form type dynamically
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<LoginFormData | RegisterFormData>({
//     resolver: zodResolver(isLogin ? loginSchema : registerSchema),
//   });

  

//   const handleFormSubmit = async (data: LoginFormData | RegisterFormData) => {
//     try {
//       await onSubmit(data);
//     } catch (error: unknown) {
//       const err = error as { message?: string };
//       setError("root", {
//         type: "manual",
//         message: err.message || "An unexpected error occurred",
//       });
//     }
//   };

  

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl text-center font-semibold">
//           {isLogin ? "Welcome back" : "Create account"}
//         </CardTitle>
//         <CardDescription className="text-center">
//           {isLogin
//             ? "Enter your email and password to sign in"
//             : "Enter your details to create your account"}
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
//           {!isLogin && (
//             <div className="space-y-2">
//               <label htmlFor="name" className="text-sm font-medium">
//                 Full Name
//               </label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="John Doe"
//                 {...register("name")}
//                 className={errors.name ? "border-destructive" : ""}
//               />
//               {errors.name && (
//                 <p className="text-sm text-destructive">
//                   {errors.name.message as string}
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="space-y-2">
//             <label htmlFor="email" className="text-sm font-medium">
//               Email
//             </label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="john@example.com"
//               {...register("email")}
//               className={errors.email ? "border-destructive" : ""}
//             />
//             {errors.email && (
//               <p className="text-sm text-destructive">
//                 {errors.email.message as string}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="password" className="text-sm font-medium">
//               Password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               placeholder={isLogin ? "Your password" : "At least 6 characters"}
//               {...register("password")}
//               className={errors.password ? "border-destructive" : ""}
//             />
//             {errors.password && (
//               <p className="text-sm text-destructive">
//                 {errors.password.message as string}
//               </p>
//             )}
//           </div>

//           {!isLogin && (
//             <div className="space-y-2">
//               <label htmlFor="confirmPassword" className="text-sm font-medium">
//                 Confirm Password
//               </label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 {...register("confirmPassword")}
//                 className={errors.confirmPassword ? "border-destructive" : ""}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-sm text-destructive">
//                   {errors.confirmPassword.message as string}
//                 </p>
//               )}
//             </div>
//           )}

//           {errors.root && (
//             <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
//               {errors.root.message as string}
//             </div>
//           )}

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading && (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             {isLogin ? "Sign In" : "Create Account"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  loginSchema,
  registerSchema,
} from "../../utils/validation";
import { z } from "zod";

// ✅ Derive types directly from schemas for type safety
type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>;
  isLoading: boolean;
}

export function AuthForm({ type, onSubmit, isLoading }: AuthFormProps) {
  const isLogin = type === "login";

  // ✅ Correctly handle dynamic schema types
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema) as any,
  });

  const handleFormSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      await onSubmit(data);
    } catch (error: unknown) {
      const err = error as { message?: string };
      setError("root", {
        type: "manual",
        message: err.message || "An unexpected error occurred",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-semibold">
          {isLogin ? "Welcome back" : "Create account"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin
            ? "Enter your email and password to sign in"
            : "Enter your details to create your account"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Full Name (only for register) */}
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name" as keyof RegisterFormData)}
                className={errors?.name ? "border-destructive" : ""}
              />
              {errors && "name" in errors && (
                <p className="text-sm text-destructive">
                  {(errors as any).name?.message}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email" as keyof (LoginFormData | RegisterFormData))}
              className={errors?.email ? "border-destructive" : ""}
            />
            {errors && "email" in errors && (
              <p className="text-sm text-destructive">
                {(errors as any).email?.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder={isLogin ? "Your password" : "At least 6 characters"}
              {...register("password" as keyof (LoginFormData | RegisterFormData))}
              className={errors?.password ? "border-destructive" : ""}
            />
            {errors && "password" in errors && (
              <p className="text-sm text-destructive">
                {(errors as any).password?.message}
              </p>
            )}
          </div>

          {/* Confirm Password (only for register) */}
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword" as keyof RegisterFormData)}
                className={errors?.confirmPassword ? "border-destructive" : ""}
              />
              {errors && "confirmPassword" in errors && (
                <p className="text-sm text-destructive">
                  {(errors as any).confirmPassword?.message}
                </p>
              )}
            </div>
          )}

          {/* Root Error */}
          {"root" in errors && (errors as any).root && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {(errors as any).root.message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
