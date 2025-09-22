import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Mail, Lock } from "lucide-react";

const LoginScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="!rounded-2xl border border-gray-200 w-full max-w-md">
        <CardContent className="p-8 flex flex-col gap-6">
          {/* Logo / Title */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-bold text-xl">
              V
            </div>
            <Typography variant="h6" className="font-semibold text-gray-800">
              Welcome 
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Sign in to continue
            </Typography>
          </div>

          {/* Email Field */}
          <TextField
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={18} className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            size="small"
            label="Password"
            type="password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={18} className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Button size="small" className="text-emerald-600 normal-case">
              Forgot Password?
            </Button>
          </div>

          {/* Sign In Button */}
          <Button
            variant="contained"
            fullWidth
            className="!bg-emerald-600 hover:!bg-emerald-700 !rounded-xl !py-2 normal-case font-medium"
          >
            Sign In
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Secondary Actions */}
          <Button
            variant="outlined"
            fullWidth
            className="!rounded-xl !py-2 normal-case border-gray-300 text-gray-700"
          >
            Continue with Google
          </Button>

          {/* Signup Link */}
          <Typography variant="body2" className="text-center text-gray-500">
            Don’t have an account?{" "}
            <span className="text-emerald-600 font-medium cursor-pointer">
              Sign up
            </span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
