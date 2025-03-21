import axios from "axios";
import { useContext, useEffect, useState, createContext } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState(null); 
    const [mycourse, setMyCourse] = useState([]);

    async function fetchCourses() {
        try {
            const { data } = await axios.get(`${server}/api/courses/all`);
            setCourses(data.courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    async function fetchCourse(id) {
        try {
            const { data } = await axios.get(`${server}/api/course/${id}`);
            setCourse(data.course);
        } catch (error) {
            console.error("Error fetching course:", error);
        }
    }
    async function fetchMyCourse() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Error fetching course: Token is missing."); 
                return; 
            }

            const { data } = await axios.get(`${server}/api/mycourses`, {
                headers: {
                    token: token, // Use the token found in the variable
                },
            });
            setMyCourse(data.courses);
        } catch (error) {
          // Log the error, if its from the response, log the server response.
            console.error("Error fetching course:", error);
            if (error.response) {
              console.error("Server response:", error.response.data);
            }
        }
    }

    useEffect(() => {
        fetchCourses();       
        fetchMyCourse();
    }, []);

    return (
        <CourseContext.Provider value={{ courses, fetchCourses, fetchCourse, course, mycourse ,fetchMyCourse}}>
            {children}
        </CourseContext.Provider>
    );
};

export const CourseData = () => useContext(CourseContext);