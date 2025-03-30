import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';
import './lecture.css';

const Lecture = ({ user }) => {
    const [lectures, setLectures] = useState([]);
    const [lecture, setLecture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);
    const [show, setShow] = useState(false);
    const params = useParams();

    async function fetchLectures() {
        try {
            const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
                headers: { token: localStorage.getItem('token') },
            });
            setLectures(data.lectures);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchLecture(id) {
        setLecLoading(true);
        try {
            const { data } = await axios.get(`${server}/api/lecture/${id}`, {
                headers: { token: localStorage.getItem('token') },
            });
            setLecture(data.lecture);
        } catch (error) {
            console.error(error);
        } finally {
            setLecLoading(false);
        }
    }

    useEffect(() => {
        fetchLectures();
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="lecture-page">
                    <div className="left">
                        {lecLoading ? (
                            <Loading />
                        ) : lecture && lecture.video ? (
                            <>
                                <video
                                    src={`${server}/${lecture.video}`}
                                    width="100%"
                                    controls
                                    controlsList="nodownload noremoteplayback"
                                    disablePictureInPicture
                                    disableRemotePlayback
                                    autoPlay
                                    style={{ outline: 'none' }}
                                ></video>
                                <h1>{lecture.title}</h1>
                                <h3>{lecture.description}</h3>
                            </>
                        ) : (
                            <h1>Please select a Lecture</h1>
                        )}
                    </div>
                    <div className="right">
                        {user && user.role === 'admin' && (
                            <button className="common-btn" onClick={() => setShow(!show)}>
                                {show ? "Close":"Add Lecture+"}
                            </button>
                        )}
                        {show && (
                            <div className="lecture-form">
                                <h2>Add Lecture</h2>
                                <form>
                                    <label htmlFor="text">Title</label>
                                    <input type="text" required />

                                    <label htmlFor="text">Description</label>
                                    <input type="text" required />

                                    <input type="file" placeholder="Choose video" required />

                                    <button type="submit" className="common-btn">
                                        Add Lecture
                                    </button>
                                </form>
                            </div>
                        )}
                        {lectures.length > 0 ? (
                            lectures.map((e, i) => (
                                <div key={e._id}>
                                    <div
                                        onClick={() => fetchLecture(e._id)}
                                        className={`lecture-number ${lecture?._id === e._id ? 'active' : ''}`}
                                    >
                                        {i + 1}. {e.title}
                                    </div>
                                    {user && user.role === 'admin' && (
                                        <button className="common-btn" style={{ background: 'red' }}>
                                            Delete {e.title}
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No Lectures</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Lecture;
