"use client";
import { useState } from "react";
import { Curio } from "./curioServices";
import {
	CurioConnectData,
	CurioMoveCommand,
	CurioMoveData,
	DataType,
	PeerData,
} from "./types";

let curio: Curio | undefined;

export const processReceivedData = (data: PeerData): void => {
	switch (data.type) {
		case DataType.CURIO_CONNECT:
			console.log("curio_conn");

			processCurioConnect(data.data as CurioConnectData);
			break;

		case DataType.CURIO_MOVE:
			console.log("curio_move");
			processCurioMove(data.data as CurioMoveCommand);
			break;

		case DataType.CURIO_MOVE_PARAMS:
			console.log("curio_param");
			processCurioMoveParams(data.data as CurioMoveData);
			break;

		case DataType.CURIO_MOVE_VECTOR:
			console.log("curio_vector");
			processCurioMoveVector(data.data as CurioMoveData);
			break;

		default:
			break;
	}
};

const processCurioConnect = (data: CurioConnectData): void => {
	if (!curio) {
		curio = new Curio();
	}

	if (!data.isConnected) {
		curio.connect(() => {
			console.log("Connected to Curio.");
		});
	} else {
		curio.disconnect(() => {
			console.log("Disconnected from Curio.");
		});
	}
};

const processCurioMove = (data: CurioMoveCommand): void => {
	// Move Curio.
	if (curio && curio.connected) {
		if (data.message === "move") {
			curio.move();
		} else if (data.message === "stop") {
			curio.stop();
		}
	}
};

const processCurioMoveParams = (data: CurioMoveData): void => {
	// Set Curio params.
	if (curio && curio.connected) {
		curio.setParameters(data.x, data.y, data.speed);
	}
};

const processCurioMoveVector = (data: CurioMoveData): void => {
	// Set Curio vector params.
	if (curio && curio.connected) {
		curio.setVectorParameters(data.x, data.y, data.speed);
	}
};
