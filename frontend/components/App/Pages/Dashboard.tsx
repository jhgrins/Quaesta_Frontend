import { Box, Skeleton, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
// import { GetSatellitesOverview } from "../../../graphql/query.js";

import SatelliteCard from "../../UI/SatelliteCard";

const DashBoard = () => {
	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Typography sx={{ fontSize: 40, fontWeight: 500 }}>Dashboard</Typography>
			<Box mt={4} flexGrow={1} minHeight={500} className={"verticalScrollDiv"}>
				Hello World!
			</Box>
		</Box>
	);
};

export default DashBoard;
