import React, { useEffect, useState } from "react";
import "./student.css";

function Student() {
	const [notes, setNotes] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const getAnnouncements = async ()=>{
    const response = await fetch("https://ratibar.herokuapp.com/announcements");
		const data = await response.json();
		setAnnouncements(data);
		console.log(data);
  };
  useEffect(() => {
		getAnnouncements();
	}, []);

	const getNotes = async () => {
		const response = await fetch("https://ratibar.herokuapp.com/schedules");
		const data = await response.json();
		setNotes(data);
		console.log(data);
	};

	useEffect(() => {
		getNotes();
	}, []);
	return (
		<div className="main-container">

    {/* card of individual events */}
			<div className="cards-container">
				{notes.map((note) => {
					return (
						<div className="schedules">
							<div className="schedule-card">
								<h2>{note.title}</h2>
								<h4>{note.description}</h4>
								<a href={note.meeting_link}>{note.meeting_link}</a>
								<p>{note.date}</p>
							</div>
						</div>
					);
				})}
			</div>
      {/* end-of-card */}

      {/* Announcements-card */}
      <div className="announcement-container">
				{announcements.map((announcement) => {
					return (
						<div className="announcement">
							<div className="announcement-card">
								<h2>{announcement.title}</h2>
								<h4>{announcement.description}</h4>
							</div>
						</div>
					);
				})}
			</div>
      {/* end-of-card */}
		</div>
	);
}

export default Student;
