import React from "react";
import { CircleUserRound, DollarSign, MapPin } from "lucide-react";
import { Button } from "./button";

type Props = {
  name: string;
  location: string;
  owner: string;
  price: string;
  image: string;
};

const Houses = ({ name, location, owner, price, image }: Props) => {
  return (
    <div className="w-[360px] h-[440px] border rounded-lg">
        <img src={image} className="w-full rounded-t-lg" />
        <div className="p-5 space-y-4">
            <p className="text-3xl tracking-tighter text-center">{name}</p>
            <div className="flex items-center gap-3 justify-between">
                <div className="tracking-tighter flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <p className="font-semibold">{parseInt(price).toLocaleString("en-US")}</p>
                </div>
                <div className="tracking-tighter flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <p>{location}</p>
                </div>
                <div className="tracking-tighter flex items-center gap-1">
                    <CircleUserRound className="h-4 w-4 text-blue-500" />
                    <p>{owner}</p>
                </div>
            </div>
            <Button className="w-full">View Auction</Button>
        </div>
    </div>
  );
};

export default Houses;
