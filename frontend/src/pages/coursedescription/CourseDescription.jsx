import React, { useEffect, useState } from 'react';
import './coursedescription.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { CiShoppingCart } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa6";
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../main';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';

const CourseDescription = ({ user }) => {
    const params = useParams();
    console.log(params.id);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const { fetchUser } = UserData();
    const { fetchCourse, course, fetchCourses } = CourseData();

    useEffect(() => {
        fetchCourse(params.id);
    }, [params.id]);

    const checkoutHandler = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            const { data: { order } } = await axios.post(
                `${server}/api/course/checkout/${params.id}`,
                {},
                {
                    headers: { token },
                }
            );

            const options = {
                key: "rzp_test_EikYXmxoBIZHq0",
                amount: order.amount, // Fixed here
                currency: "INR",
                name: "LearnIt",
                description: "Grow and Rise",
                order_id: order.id,
                handler: async function (response) {
                    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

                    try {
                        const { data } = await axios.post(
                            `${server}/api/verification/${params.id}`,
                            { razorpay_order_id, razorpay_payment_id, razorpay_signature },
                            { headers: { token } }
                        );

                        await fetchUser();
                        await fetchCourses();
                        toast.success(data.message);
                        setLoading(false);
                        navigate(`/payment-success/${razorpay_payment_id}`);
                    } catch (error) {
                        toast.error(error.response?.data?.message);
                        setLoading(false);
                    }
                },
                theme: {
                    color: "#8a4baf",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            toast.error(error.response?.data?.message);
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {course && (
                        <div className="course-description">
                            <div className='course-header'>
                                <img src={`${server}/${course.image}`} alt="" className='course-image' />
                                <div className="course-info">
                                    <h2>{course.title}</h2>
                                    <p>Instructor: {course.createdBy}</p>
                                    <p>Duration: {course.duration} weeks</p>
                                </div>
                            </div>
                            <p>{course.description}</p>
                            <p>Let's start your new journey with this course at just ₹{course.price}</p>

                            {user && user.subscription.includes(course._id) ? (
                                <button onClick={() => navigate(`/course/study/${course._id}`)} className='common-btn'>
                                    <FaBookOpen /> Study
                                </button>
                            ) : (
                                <button onClick={checkoutHandler} className='common-btn'>
                                    <CiShoppingCart /> Buy Now
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default CourseDescription;