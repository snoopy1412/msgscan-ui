export enum STATUS {
  INFLIGHT = "INFLIGHT",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export const STATUS_MAP = {
  [STATUS.INFLIGHT]: {
    title: "Inflight",
    color: "bg-yellow-500",
  },
  [STATUS.SUCCESS]: {
    title: "Success",
    color: "bg-green-500",
  },
  [STATUS.FAILED]: {
    title: "Failed",
    color: "bg-red-500",
  },
};
