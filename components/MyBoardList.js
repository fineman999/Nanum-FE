import Link from "next/link";
import { Router, useRouter } from "next/router";
import React from "react";
import css from "styled-jsx/css";
import { displayedAt, displayedAtV2 } from "../lib/utils/useful-functions";
import Checkbox from "@mui/material/Checkbox";
const style = css`
  #unit_mail {
    background-color: #ffff;
    display: flex;
    padding: 2rem 1rem;

    margin-bottom: 0.1rem;
    align-items: center;
    height: 10vh;
    box-sizing: border-box;
  }

  #mail_user {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #mail_user p {
    color: #acabab;
  }
  h3 {
    font-weight: 400;
  }
  .overlay {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function MyBoardList({
  title,
  content,
  createAt,
  id,
  isUpdate,
  setDeleteState,
}) {
  const router = useRouter();
  const handleDelete = () => {
    console.log("handleDelete");
    //   setDeleteState()
  };
  return (
    <>
      <div key={id} id="unit_mail">
        <Link href={`/community/board/${id}`}>
          <div style={{ width: "100%" }}>
            <div id="mail_user">
              <div style={{ width: "80%" }}>
                <h3 className="overlay">{title}</h3>
                <p className="overlay" style={{ color: "gray" }}>
                  {content}
                </p>
              </div>
              <p>{displayedAt(createAt)}</p>
            </div>
          </div>
        </Link>
        {isUpdate && (
          <div>
            <Checkbox {...label} color="default" onClick={handleDelete} />
          </div>
        )}
      </div>

      <style jsx>{style}</style>
    </>
  );
}
