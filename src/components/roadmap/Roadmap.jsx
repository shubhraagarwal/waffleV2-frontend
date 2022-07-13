import React from "react";
import "./Roadmap.scss";

const Roadmap = () => {
  const data = [
    {
      phase: "COOL ART",
      delay: "200",
      content:
        "Our art is the utility for our holders. Our vision for the future is to make a difference in the lives of people around the world through the creative and innovative way.",

      completed: true,
    },
    {
      phase: "COO",
      delay: "400",
      completed: true,
      content:
        "We want you to enjoy real ownership by allowing you to use ODD waffle art  in whatever manner you want.  we like them as much as you do because they're cool and quirky and pretty, The main theme or themes are yours to write about freely without attribution - this is no longer necessary since everything related has gone public :) ",
    },
  ];
  return (
    <section className="container-fluid roadmap" id="roadmap">
      <div className="container">
        <h2>No Roadmap</h2>
        <div className="row g-5">
          {data.map(({ phase, content, completed, delay }, index) => (
            <div className="col-12 col-md-6 col-xl-6 " key={index}>
              <div
                className={`roadmap-card ${completed && "active"}`}
                data-aos="fade-up"
                data-aos-delay={delay}
              >
                <h3>{phase}</h3>
                <p>{content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
