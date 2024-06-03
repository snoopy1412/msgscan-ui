"use client";

import React, { useState, useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { formatNumber } from "@/utils";

interface CounterProps {
  target: number;
}
function Counter({ target }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevTargetRef = useRef(0);

  useEffect(() => {
    const prevTarget = prevTargetRef.current;
    animate(prevTarget, target, {
      duration: 2,
      ease: "easeInOut",
      onUpdate: (latest) => setDisplayValue(parseFloat(latest.toFixed(2))),
    });

    prevTargetRef.current = target;
  }, [target]);

  return <span>{formatNumber(displayValue)}</span>;
}

export default Counter;
