/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { lighten } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";
import Particles from "react-tsparticles";

import { Box } from "@mui/material";

export const ParticlesBlock = ({ sx, children }: any) => {
  const graphColor = lighten(lightBlue["500"], 0.7);

  const options = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 600,
        },
      },
      color: {
        value: graphColor,
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 6,
        random: true,
        anim: {
          enable: false,
          speed: 80,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: graphColor,
        opacity: 0.4,
        width: 2,
      },
      move: {
        enable: true,
        speed: 0.75,
        direction: "none  ",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 200,
          rotateY: 200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 100,
          size: 30,
          duration: 2,
          opacity: 0.8,
          speed: 3,
        },
        repulse: {
          distance: 400,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <Box style={{ display: "flex", flexGrow: 1 }}>
      <Box
        style={{
          position: "absolute",
          display: "flex",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
      <Particles {...sx} options={options} />
    </Box>
  );
};
