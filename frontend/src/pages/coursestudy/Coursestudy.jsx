import React, { useEffect } from 'react';
import './coursestudy.css';
import { useParams, Navigate, Link } from 'react-router-dom';
import { server } from '../../main';
import { CourseData } from '../../context/CourseContext';

const Coursestudy = ({ user }) => {
    const params = useParams();
    const { fetchCourse, course } = CourseData();

    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        fetchCourse(params.id);
    }, [params.id]);

    return (
        <>
            {course && (
                <div className="course-study-page">
                    <img src={`${server}/${course.image}`} alt="" width={300} />
                    <h2>{course.title}</h2>
                    <h4>{course.description}</h4>
                    <h5>by - {course.createdBy}</h5>
                    <h5>Duration - {course.duration} weeks</h5>
                    <Link to = {`/lectures/${course._id}`}>
                     <h2>Lectures</h2>
                    </Link>
                </div>
            )}
        </>
    );
};

export default Coursestudy;
