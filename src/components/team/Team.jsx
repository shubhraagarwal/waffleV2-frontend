import React from "react";
import "./Team.scss";
import team1 from "../../assets/waffle5.jpg";
import team2 from "../../assets/waffle9.png";
import team3 from "../../assets/waffle1.png";
import team4 from "../../assets/waffle7.png";
import team5 from "../../assets/waffle8.png";
import team6 from "../../assets/waffle2.png";
import team8 from "../../assets/Wizard.png";
import goose from "../../assets/Goose.png";
import cepted from "../../assets/cepted.png";
const Team = () => {
  const data = [
    {
      image: team1,
      name: "Jammyz",
      position: "Founder",
      delay: "0",
    },
    {
      image: team8,
      name: "Zombs",
      position: "Founder",
      delay: "200",
    },
    {
      image: team2,
      name: "Sheep",
      position: "Founder",
      delay: "400",
    },
    {
      image: team3,
      name: "Ceice",
      position: "Founder",
      delay: "0",
    },
    {
      image: team4,
      name: "Zoof",
      position: "Founder",
      delay: "200",
    },
    {
      image: team5,
      name: "Karalang",
      position: "Artist",
      delay: "400",
    },
    {
      image: team6,
      name: "Carlos",
      position: "Artist",
      delay: "0",
    },
    {
      image: goose,
      name: "Goose",
      position: "Artist",
      delay: "0",
    },
    {
      image: cepted,
      name: "Cepted",
      position: "Community Manager",
      delay: "0",
    },
  ];
  return (
    <section className="container-fluid team" id="team">
      <div className="container">
        <h2>Team</h2>
        <div className="row g-5 justify-content-center">
          {data.map(({ image, name, position, delay }, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className="team-card" data-aos="fade" data-aos-delay={delay}>
                <img src={image} alt={name} className="img-fluid" />
                <h5>{name}</h5>
                <p>{position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
