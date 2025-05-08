import Houses from "@/components/ui/houses";
import prisma from "@/db";
import React from "react";

type Props = {};

const Auction = async (props: Props) => {
  const houses = await prisma.house.findMany();

  return (
    <div className="grid grid-cols-4 p-5 gap-4">
      {houses.map((house) => (
        <Houses
          image={house.image}
          location={house.location}
          name={house.name}
          owner={house.owner}
          price={house.price}
          key={house.id}
        />
      ))}
    </div>
  );
};

export default Auction;
