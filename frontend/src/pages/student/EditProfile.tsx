import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { UploadCloud, Pencil, Camera, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  endLoading,
  startLoading,
  updateUser,
} from "../../features/auth/authSlice";
import {
  editEmail,
  editUser,
  getUser,
  sendChangeEmailOtp,
  updateProfilePicture,
} from "../../features/auth/authThunk";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [profilePic, setProfilePic] = useState<string>("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditing, setIsEditing] = useState<{
    firstname: boolean;
    lastname: boolean;
    phone: boolean;
  }>({
    firstname: false,
    lastname: false,
    phone: false,
  });
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      const result: any = await dispatch(getUser());
      if (getUser.fulfilled.match(result)) {
        const { user } = result.payload;
        if (user) {
          setProfilePic(user.profileImage || "");
          setInitialValues({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            phone: user.phone || "",
            email: user.email || ""
          });
        }
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleProfilePicChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only images are allowed.");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("Images must be less than 5mb");
        return;
      }

      formData.append("profileImage", file);
      if (profilePic) {
        URL.revokeObjectURL(profilePic);
      }

      const objectUrl = URL.createObjectURL(file);
      setProfilePic(objectUrl);

      const toastId = toast.loading("Uploading image...");
      const result = await dispatch(updateProfilePicture(formData));
      toast.dismiss(toastId);

      if (updateProfilePicture.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(updateUser(result.payload.user));
      } else {
        toast.error(result.payload as string);
      }
    }
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required("First name is required")
      .matches(
        /^[A-Za-z\s]+$/,
        "First name must only contain letters and spaces"
      ),
    lastname: Yup.string()
      .required("Last name is required")
      .matches(
        /^[A-Za-z\s]+$/,
        "Last name must only contain letters and spaces"
      ),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must be only digits")
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(startLoading());
      const trimmedValues = {
        firstname: values.firstname.trim(),
        lastname: values.lastname.trim(),
        phone: values.phone.trim(),
      };
      const result = await dispatch(editUser(trimmedValues));
      if (editUser.fulfilled.match(result)) {
        toast.success(result.payload.message);
        setIsEditing({ firstname: false, lastname: false, phone: false });
      } else {
        toast.error(result.payload as string);
      }
      dispatch(endLoading());
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-5 p-6">
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
              <UploadCloud size={40} />
            </div>
          )}
          <label className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full cursor-pointer">
            <Camera className="text-white w-5 h-5" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </label>
        </div>
        <p className="text-lg font-semibold mt-3">Edit Profile</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 mt-5 mx-auto max-w-lg"
      >
        {Object.keys(isEditing).map((field) => (
          <div key={field} className="relative">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              {field.replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder={`Enter ${field}`}
                {...formik.getFieldProps(field as keyof typeof formik.values)}
                disabled={!isEditing[field as keyof typeof isEditing]}
              />
              <Pencil
                className="w-5 h-5 text-gray-500 cursor-pointer"
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, [field]: true }))
                }
              />
            </div>
            {formik.touched[field as keyof typeof formik.touched] &&
              formik.errors[field as keyof typeof formik.errors] && (
                <p className="text-red-500 text-sm">
                  {formik.errors[field as keyof typeof formik.errors]}
                </p>
              )}
          </div>
        ))}

        {!isEditingEmail ? (
          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              <span className=" font-semibold">Email:</span>{" "}
              {formik.values.email}
            </p>
            <p
              className="text-blue-600 cursor-pointer underline"
              onClick={() => setIsEditingEmail(true)}
            >
              Edit
            </p>
          </div>
        ) : (
          <EmailUpdate onComplete={() => setIsEditingEmail(false)} />
        )}

        <Button
          type="submit"
          className="w-full"
          variant={"outline"}
          disabled={!formik.dirty || !formik.isValid}
        >
          {loading ? (
            <Loader className="w-6 h-6 animate-spin  mx-auto" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
};

interface EmailUpdateProps {
  onComplete: () => void;
}

const EmailUpdate: React.FC<EmailUpdateProps> = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const emailSchema = Yup.string()
    .email("Invalid email format")
    .required("Email is required");

  const sendOtp = async () => {
    try {
      await emailSchema.validate(email);
      const result = await dispatch(sendChangeEmailOtp(email));
      if (sendChangeEmailOtp.fulfilled.match(result)) {
        toast.success(result.payload.message);
        setIsOtpSent(true);
      } else {
        toast.error(result.payload as string);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const verifyOtp = async () => {
    const result = await dispatch(editEmail({ email, otp }));
    if (editEmail.fulfilled.match(result)) {
      toast.success(result.payload.message);
      onComplete();
      navigate("/profile/dashboard");
    } else {
      toast.error(result.payload as string);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <Input
        type="email"
        placeholder="Enter new email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isOtpSent ? (
        <Button className="w-full" onClick={sendOtp} type="button">
          Send OTP
        </Button>
      ) : (
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="# Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="flex-1"
          />
          <Button onClick={verifyOtp} type="button" className="w-auto px-4">
            {loading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Verify"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
