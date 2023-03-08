import React, { useState } from "react";

import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

// Icons
import Fab from "@mui/material/Fab";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "../../../css/workout.css";
import EditExerciseModal from "./EditExerciseModal";

function DayWorkoutListItem({
  handleEditInfo,
  handleDelete,
  showButtons,
  exercise,
}) {
  const [showMore, setShowMore] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // Anchor for edit button popover

  // Handles open state for edit popover
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const exerciseName = exercise.name;
  const exerciseId = exercise.exercise_id;
  const { instructions, type, intensity, duration, weight, sets, reps } =
    exercise;

  let intensityName = "";
  if (intensity === 1) {
    intensityName = "Low";
  } else if (intensity === 2) {
    intensityName = "Medium";
  } else {
    intensityName = "High";
  }

  // Toggles popover
  const handleEditClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  // Handles when we click out of edit
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (e, exerciseId) => {
    e.stopPropagation();
    handleDelete(exerciseId);
  };

  return (
    <>
      <ListItemButton onMouseDown={() => setShowMore(!showMore)}>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "" }}>
            {type === "cardio" ? (
              <DirectionsRunIcon color="secondary" />
            ) : (
              <FitnessCenterIcon color="secondary" />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={exerciseName}
          secondary={
            <>
              {type === "cardio" ? (
                <span className="workout-details">
                  <span>{`Intensity: ${intensityName}`}</span> |
                  <span>{`Duration: ${duration} minute(s)`}</span>
                </span>
              ) : (
                <span className="workout-details">
                  <span>{`Weight: ${weight} lb(s)`}</span>|
                  <span>{`Sets: ${sets}`}</span>|<span>{`Reps: ${reps}`}</span>
                </span>
              )}
              {showMore && <div>Instructions: {instructions}</div>}
            </>
          }
        />
        {showButtons && (
          <ListItemSecondaryAction onMouseDown={(e) => e.stopPropagation()}>
            <Fab
              color="secondary"
              aria-label="edit"
              size="medium"
              onClick={handleEditClick}
            >
              <EditIcon />
            </Fab>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              style={{ marginRight: 4 }}
            >
              <EditExerciseModal
                exerciseId={exerciseId}
                type={type}
                handleClose={handleClose}
                handleEditInfo={handleEditInfo}
                intensity={intensity}
                duration={duration}
                weight={weight}
                sets={sets}
                reps={reps}
              />
            </Popover>
            <Fab
              color="error"
              aria-label="edit"
              size="medium"
              sx={{ ml: 1 }}
              onClick={(e) => handleDeleteClick(e, exerciseId)}
            >
              <ClearIcon />
            </Fab>
          </ListItemSecondaryAction>
        )}
      </ListItemButton>
      <Divider />
    </>
  );
}

export default DayWorkoutListItem;
