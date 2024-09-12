"use client";
import React from "react";
import { useParams } from "next/navigation";
const EventRegistration = () => {
	const { eventCode, sessionCode } = useParams();
	return (
		<div>
			Event Registration for event {eventCode} session {sessionCode}
		</div>
	);
};

export default EventRegistration;
