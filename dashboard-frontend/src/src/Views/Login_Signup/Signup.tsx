import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { User, Mail, Lock } from "lucide-react";

const SignupScreen: React.FC = () => {
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
              Create Account
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Sign up to get started
            </Typography>
          </div>

          {/* Full Name */}
          <TextField
            fullWidth
            size="small"
            label="Full Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User size={18} className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />

          {/* Username */}
          <TextField
            fullWidth
            size="small"
            label="Username"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={18} className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
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

          {/* Confirm Password */}
          <TextField
            fullWidth
            size="small"
            label="Confirm Password"
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

          {/* Sign Up Button */}
          <Button
            variant="contained"
            fullWidth
            className="!bg-emerald-600 hover:!bg-emerald-700 !rounded-xl !py-2 normal-case font-medium"
          >
            Sign Up
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Signup */}
          <Button
            variant="outlined"
            fullWidth
            className="!rounded-xl !py-2 normal-case border-gray-300 text-gray-700"
          >
            Continue with Google
          </Button>

          {/* Already have an account */}
          <Typography variant="body2" className="text-center text-gray-500">
            Already have an account?{" "}
            <span className="text-emerald-600 font-medium cursor-pointer">
              Sign in
            </span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupScreen;
