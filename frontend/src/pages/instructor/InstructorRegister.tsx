import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrayField from "../../components/common/ArrayField";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { useAppDispatch } from "../../app/hooks";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import { RegisterInstructor } from "../../features/auth/authThunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InstructorRegistration = () => {
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      qualifications: [] as string[],
      skills: [] as string[],
      experience: "",
      bio: "",
      password: "",
    },
    validationSchema: Yup.object({
      qualifications: Yup.array().min(
        1,
        "At least one qualification is required"
      ),
      skills: Yup.array().min(1, "At least one skill is required"),
      experience: Yup.number()
        .typeError("Experience must be a valid number")
        .min(1, "Minimum 1 year required")
        .required("Experience is required"),
      bio: Yup.string()
        .min(20, "Bio must be at least 20 characters long")
        .required("Bio is required"),
      password:
        step === 2
          ? Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required")
          : Yup.string(),
    }),
    onSubmit: async (values) => {
      dispatch(startLoading());
      const result = await dispatch(
        RegisterInstructor({
          ...values,
          experience: parseInt(values.experience),
        })
      );
      if(RegisterInstructor.fulfilled.match(result)){
        toast.success(result.payload.message)
        navigate('/')
      }else if(RegisterInstructor.rejected.match(result)){
        toast.error(result.payload as string)
      }
      dispatch(endLoading())
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        {step === 1 ? "Instructor Registration" : "Set Password"}
      </h2>

      <form onSubmit={formik.handleSubmit}>
        {step === 1 ? (
          <>
            {/* Qualifications */}
            <ArrayField
              name="qualifications"
              label="Qualifications"
              values={formik.values.qualifications}
              onChange={(newValues) =>
                formik.setFieldValue("qualifications", newValues)
              }
            />
            {formik.touched.qualifications && formik.errors.qualifications && (
              <p className="text-red-500 text-sm">
                {formik.errors.qualifications}
              </p>
            )}

            {/* Skills */}
            <ArrayField
              name="skills"
              label="Skills"
              values={formik.values.skills}
              onChange={(newValues) =>
                formik.setFieldValue("skills", newValues)
              }
            />
            {formik.touched.skills && formik.errors.skills && (
              <p className="text-red-500 text-sm">{formik.errors.skills}</p>
            )}

            {/* Experience */}
            <div>
              <label className="font-bold">Experience (Years)</label>
              <Input
                type="number"
                name="experience"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 0) {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                value={formik.values.experience}
                className="dark:bg-slate-800"
              />
              {formik.touched.experience && formik.errors.experience && (
                <p className="text-red-500 text-sm">
                  {formik.errors.experience}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="font-bold">Bio</label>
              <Textarea
                name="bio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                placeholder="Tell us about yourself..."
                className="dark:bg-slate-800"
              />
              {formik.touched.bio && formik.errors.bio && (
                <p className="text-red-500 text-sm">{formik.errors.bio}</p>
              )}
            </div>

            {/* Next Button */}
            <Button
              type="button"
              className="w-full mt-4"
              onClick={() => setStep(2)}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Next
            </Button>
            <Button type="button" className="w-full mt-4" variant='outline' onClick={() => navigate('/')}>Cancel</Button>
          </>
        ) : (
          <>
            {/* Password */}
            <div>
              <label className="font-bold">Password</label>
              <Input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="dark:bg-slate-800"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Submit & Back Buttons */}
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default InstructorRegistration;
