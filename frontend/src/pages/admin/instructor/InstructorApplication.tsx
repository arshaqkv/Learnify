import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSingleInstructor, updateInstructorStatus } from "../../../features/admin/adminThunk";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "../../../components/ui/skeleton";
import { endLoading, startLoading } from "../../../features/admin/adminSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";

const InstructorApplication = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();
  const [request, setRequest] = useState<any>(null);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  if (!id) {
    toast.error("Error fetching instructor");
    return;
  }

  useEffect(() => {
    const fetchInstructor = async () => {
      dispatch(startLoading());
      const result = await dispatch(getSingleInstructor(id));
      if (getSingleInstructor.fulfilled.match(result)) {
        setRequest(result.payload.instructor);
      }
      dispatch(endLoading());
    };
    fetchInstructor();
  }, [dispatch, id]);

  const handleAction = async (status: "approved" | "rejected", reason?: string) => {
    const payload = { id, status, rejectionReason: reason || undefined };
    const result = await dispatch(updateInstructorStatus(payload));
    
    if (updateInstructorStatus.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/admin/instructors");
    } else if (updateInstructorStatus.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  if (loading) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-400">
            Instructor Application Request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex align-middle justify-between">
              <p className="text-2xl">
                {request?.instructorId?.firstname + " " + request?.instructorId?.lastname}
              </p>
              <p>
                <strong>Applied Date:</strong> {new Date(request?.createdAt).toDateString()}
              </p>
            </div>

            {/* Status */}
            <p>
              <strong>Status:</strong> 
              <Badge className={request?.status === "approved" ? "bg-green-500" : request?.status === "rejected" ? "bg-red-500" : "bg-blue-500"}>
                {request?.status}
              </Badge>
            </p>

            {/* Qualifications */}
            <div>
              <strong>Qualifications:</strong>
              <div className="flex gap-2 flex-wrap">
                {request?.qualifications?.length > 0 ? (
                  request.qualifications.map((qual: string, index: number) => (
                    <Badge key={index}>{qual}</Badge>
                  ))
                ) : (
                  <p>No qualifications listed</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div>
              <strong>Skills:</strong>
              <div className="flex gap-2 flex-wrap">
                {request?.skills?.length > 0 ? (
                  request.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p>No skills listed</p>
                )}
              </div>
            </div>

            {/* Experience */}
            <p>
              <strong>Experience:</strong> {request?.experience || "No experience listed"} Year/s
            </p>

            <p>
              <strong>Bio:</strong> {request?.bio || "No bio available"}
            </p>

            <hr />
            <Badge className="text-1xl" variant="secondary">
              Contact Details
            </Badge>
            <p>
              <strong>Email:</strong> {request?.instructorId?.email}
            </p>
            <p>
              <strong>Phone:</strong> {request?.instructorId?.phone}
            </p>

            {/* Action Buttons */}
            {request?.status === "pending" && (
              <div className="flex gap-4 mt-4">
                <Button onClick={() => handleAction("approved")} className="bg-green-500 hover:bg-green-600">
                  Approve
                </Button>

                {/* Reject Button (Triggers Modal) */}
                <Dialog open={isRejectModalOpen} onOpenChange={setRejectModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-red-500 hover:bg-red-600">Reject</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reason for Rejection</DialogTitle>
                    </DialogHeader>
                    <Textarea
                      placeholder="Enter the reason for rejection..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <DialogFooter>
                      <Button onClick={() => setRejectModalOpen(false)} variant="outline">
                        Cancel
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        disabled={!rejectReason.trim()}
                        onClick={() => {
                          if (rejectReason.trim().length < 10) {
                            toast.error("Rejection reason must be at least 10 characters.");
                            return;
                          }

                          handleAction("rejected", rejectReason.trim());
                          setRejectModalOpen(false);
                          setRejectReason(""); 
                        }}
                      >
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Back Button */}
            <div>
              <Button variant="outline" type="button" onClick={() => navigate("/admin/instructors")}>
                <ArrowLeft />
                Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorApplication;
