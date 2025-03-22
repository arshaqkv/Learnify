import { Button } from "../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import { getCourse } from "../../features/auth/authThunk";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";

const styles = StyleSheet.create({
  page: { padding: 30, textAlign: "center", border: "8px solid #d1d5db" },
  title: { fontSize: 40, fontWeight: "bold", color: "#374151" },
  subtitle: { fontSize: 30, fontWeight: "bold", color: "#1d4ed8", marginTop: 10 },
  text: { fontSize: 18, marginTop: 10, color: "#4b5563" },
  name: { fontSize: 26, fontWeight: "bold", color: "#1f2937", marginTop: 5 },
  course: { fontSize: 22, fontWeight: "bold", color: "#1d4ed8", marginTop: 5 },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  line: { height: 2, width: 120, backgroundColor: "#1d4ed8", marginBottom: 5 },
  footerText: { fontSize: 16, color: "#374151" },
  horizontalContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  horizontalBox: { marginHorizontal: 20, alignItems: "center" },
});

const CertificatePDF = ({ user, course }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Learnify</Text>
      <Text style={styles.subtitle}>Certificate of Completion</Text>
      <Text style={styles.text}>This is to certify that</Text>
      <Text style={styles.name}>{user?.firstname} {user?.lastname}</Text>
      <Text style={styles.text}>has successfully completed the course</Text>
      <Text style={styles.course}>{course?.title}</Text>
      <Text style={styles.text}>Issued on: {new Date().toDateString()}</Text>
      <View style={styles.footer}>
        <View>
          <View style={styles.line}></View>
          <Text style={styles.footerText}>Instructor</Text>
          <Text style={styles.footerText}>{`${course?.creator?.firstname} ${course?.creator?.lastname}`}</Text>
        </View>
        <View>
          <View style={styles.line}></View>
          <Text style={styles.footerText}>Authorized by</Text>
          <Text style={styles.footerText}>Learnify</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const Certificate = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      dispatch(startLoading());
      const courseResult = await dispatch(getCourse(courseId));
      if (getCourse.fulfilled.match(courseResult)) {
        setCourse(courseResult.payload.course);
      } else {
        toast.error(courseResult.payload as string);
      }
      dispatch(endLoading());
    };
    if (courseId) fetchCourse();
    else toast.error("Course not found");
  }, [dispatch, courseId]);

  return (
    <div className="flex flex-col items-center my-3 bg-gray-50">
      <div className="p-12 shadow-2xl rounded-lg w-[850px] text-center border-8 border-gray-300">
        <h1 className="text-5xl font-extrabold text-gray-800">Learnify</h1>
        <div className="border-t-4 border-gray-400 w-48 mx-auto mt-2"></div>
        
        <h2 className="text-4xl font-bold text-blue-700 mt-6">Certificate of Completion</h2>
        <p className="text-lg mt-6 text-gray-700 italic">This is to certify that</p>
        <h3 className="text-3xl font-semibold text-gray-900 mt-2">
          {user?.firstname} {user?.lastname}
        </h3>
        <p className="text-lg mt-4 text-gray-700">has successfully completed the course</p>
        <h2 className="text-2xl font-bold text-blue-800 mt-2">{course?.title}</h2>
        <p className="text-md text-gray-600 mt-2">Issued on: {new Date().toDateString()}</p>
        
        <div className="mt-10 flex justify-between px-12">
          <div className="text-left">
            <div className="h-1 w-40 bg-blue-500 mb-2"></div>
            <p className="text-sm text-gray-600">Instructor</p>
            <p className="text-md font-semibold">
              {`${course?.creator?.firstname} ${course?.creator?.lastname}`}
            </p>
          </div>
          <div className="text-right">
            <div className="h-1 w-40 bg-blue-500 mb-2"></div>
            <p className="text-sm text-gray-600">Authorized by</p>
            <p className="text-md font-semibold">Learnify</p>
          </div>
        </div>
      </div>
      <PDFDownloadLink
        document={<CertificatePDF user={user} course={course} />}
        fileName="certificate.pdf"
      >
        {({ loading }) => (
          <Button variant={'outline'} className=" px-6 py-2 rounded-lg shadow-lg hover:bg-blue-800">
            {loading ? "Generating..." : <Download />}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default Certificate;
