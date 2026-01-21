import { MoveLeft } from "lucide-react";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import WrapperBox from "@/custom-components/WrapperBox";
import useHooks from "@/context/HookContext";
import EscapeToBack from "@/utils/EscapeToBack";
import axios from "axios"
import LsmtTest from "./careerTests/LsmtTest";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import { useEffect, useState } from "react";
import ParentInfo from "../parentInfoBeforeTest/ParentInfo";

// Define interface for LSMT question
interface LsmtQuestion {
  id: number;
  text: string;
  type: string;
  option: Array<{
    text: string;
    score: number;
  }>;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface LsmtApiResponse {
  result?: LsmtQuestion[];
  data?: LsmtQuestion[];
  message?: string;
  success?: boolean;
}

const Lsmt = () => {
  EscapeToBack();
  const [lsmtData, setLsmtData] = useState<LsmtQuestion[]>([]);
  const { navigate } = useHooks();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isParentInfo, setIsParentInfo] = useState<boolean>(false);

  const loggedInUser = useSelector(
    (state: GetState) => state.authSlice.isLoggedInUser
  );

  // Check if user is in allowed classes
  useEffect(() => {
    if (
      loggedInUser?.class !== undefined &&
      ![6, 7, 8].includes(loggedInUser.class)
    ) {
      navigate("/career");
    }
  }, [loggedInUser, navigate]);

  // Fetch LSMT questions
  useEffect(() => {
    const LsmtFetchQuestion = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<LsmtApiResponse>(
          'http://localhost:3100/api/v2/lsmtTest/allQuestion'
        );
        
        console.log("lsmt question response:", response.data);
        
        // Handle different response structures
        const questions = response.data.result || response.data.data || [];
        
        if (questions.length > 0) {
          setLsmtData(questions);
        } else {
          setLsmtData([]);
          setError("No LSMT questions found");
        }
      } catch (error) {
        console.log("Error fetching LSMT questions:", error);
        setError("Failed to load LSMT questions. Please try again later.");
        toast.error("Failed to load LSMT test");
      } finally {
        setLoading(false);
      }
    };
    
    LsmtFetchQuestion();
  }, []); // Empty dependency array to run only once on mount

  // Check for parent info in localStorage
  useEffect(() => {
    const isParentInfoLs = localStorage.getItem("isParentInfo");
    
    if (!isParentInfoLs || isParentInfoLs === "false") {
      localStorage.setItem("isParentInfo", "false");
      setIsParentInfo(false);
    } else {
      setIsParentInfo(true);
    }
  }, []);

  // Render Parent's Questionnaire if needed
  if (!isParentInfo) {
    return <ParentInfo setIsParentInfo={setIsParentInfo} />;
  }

  // Render loading state
  if (loading) {
    return (
      <ContainerWrapper>
        <WrapperBox>
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-medium text-gray-700">Loading LSMT Test...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait while we prepare the questions</p>
          </div>
        </WrapperBox>
      </ContainerWrapper>
    );
  }

  // Render error state
  if (error) {
    return (
      <ContainerWrapper>
        <WrapperBox>
          <div className="relative text-center py-10">
            <MoveLeft
              onClick={() => navigate(-1)}
              size={35}
              className="cursor-pointer absolute left-4 top-10"
            />
            
            <h1 className="text-4xl uppercase font-extrabold font-unbounded mb-6">
              LSMT Test
            </h1>
          </div>
          
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Test</h2> */}
            <p className="text-gray-600 mb-6 max-w-md">{error}</p>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/career")}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Career
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </WrapperBox>
      </ContainerWrapper>
    );
  }

  // Render "no questions found" state
  if (lsmtData.length === 0) {
    return (
      <ContainerWrapper>
        <WrapperBox>
          <div className="relative text-center py-10">
            <MoveLeft
              onClick={() => navigate(-1)}
              size={35}
              className="cursor-pointer absolute left-4 top-10"
            />
            
            <h1 className="text-4xl uppercase font-extrabold font-unbounded mb-6">
              LSMT Test
            </h1>
          </div>
          
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No LSMT Questions Available</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              The LSMT test questions are not available at the moment. Please check back later or contact support if this issue persists.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/career")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Career Page
              </button>
            </div>
          </div>
        </WrapperBox>
      </ContainerWrapper>
    );
  }

  // Render normal LSMT test
  return (
    <>
      <ContainerWrapper>
        <WrapperBox>
          <div className="relative hidden md:block">
            <img
              src="/c-lsmt.webp"
              alt="LSMT Test"
              className="w-full h-auto drop-shadow-xl"
            />

            <p className="absolute bottom-10 lg:bottom-16 xl:bottom-20 left-8 lg:left-10 xl:left-14 text-sm lg:text-lg text-slate-100">
              Learning Style and Multiple Intelligence Test <br />
              Discover your preferred learning styles and strengths.
            </p>
          </div>

          <div className="relative text-center py-10">
            <MoveLeft
              onClick={() => navigate(-1)}
              size={35}
              className="cursor-pointer md:absolute top-1/2 -translate-y-1/2"
            />

            <h1 className="text-4xl uppercase font-extrabold font-unbounded">
              LSMT
            </h1>

            <img
              src="/star.webp"
              alt="lsmt-test"
              className="w-8 h-8 absolute top-1/2 left-1/2 translate-y-1 -translate-x-40"
            />

            <img
              src="/star.webp"
              alt="lsmt-test"
              className="absolute bottom-1/2 right-1/2 translate-y-1 translate-x-44"
            />
          </div>

          {/* Display question count info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-center text-blue-700">
              <span className="font-semibold">{lsmtData.length}</span> questions loaded. 
              Please answer all questions to complete the test.
            </p>
          </div>

          <LsmtTest />
        </WrapperBox>
      </ContainerWrapper>
    </>
  );
};

export default Lsmt;