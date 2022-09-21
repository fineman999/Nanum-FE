const GlobalSearch = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="form_content" onSubmit={handleSubmit}>
        <form className="search_form">
          <div className="form_placeholder">
            <input
              className="form_placeholder"
              type="text"
              placeholder="내 집 찾기..."
              readOnly
            />
          </div>
          <div className="form_button">
            <button className="form_submit_button">검색</button>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .container {
            position: relative;
            margin-bottom: 40px;
          }

          .form_content {
            position: absolute;
            top: -40px;
            left: 0px;
            right: 0px;
            z-index: 1;
            margin: 0px auto;
            max-width: 1030px;
            width: 100%;
          }

          .search_form {
            display: flex;
            align-items: center;
            background-color: white;
            border-radius: 15px;
            padding: 15px 30px;
            box-shadow: 0px 10px 30px 0px rgb(1 1 1 / 8%);
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            -moz-box-shadow: 0px 10px 30px 0px rgb(1 1 1 / 8%);
            -webkit-box-shadow: 0px 10px 30px 0px rgb(1 1 1 / 8%);
            -o-box-shadow: 0px 10px 30px 0px rgb(1 1 1 / 8%);
            -ms-box-shadow: 0px 10px 30px 0px rgb(1 1 1 / 8%);
          }

          .search_form .form_placeholder {
            // width: 40%;
            flex-grow: 1;
          }

          .search_form .form_placeholder .form_placeholder {
            width: 100%;
            border: none;
            font-family: lato-semi-bold;
            font-size: 16px;
            padding: 10px 15px;
          }

          .search_form .form_placeholder .form_placeholder:focus {
            outline: 2px solid #1d44f9;
            border-radius: 5px;
            color: #000000;
          }

          .search_form .form_button {
            // width: 15%;
            text-align: center;
            margin-left: 10px;
          }

          .search_form .form_button .form_submit_button {
            font-family: proxima-nova-bold;
            font-size: 16px;
            color: #ffffff;
            background-color: #1d44f9;
            text-transform: capitalize;
            border: 3px solid #1d44f9;
            border-radius: 10px;
            padding: 10px 40px;
            transition: all 0.3s ease-in-out;
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
          }

          .search_form .form_button .form_submit_button:hover {
            color: #1d44f9;
            background-color: #ffffff;
            border: 3px solid #1d44f9;
          }

          @keyframes cssAnimation {
            from {
              -webkit-transform: scale(1) translate(0px);
            }
            to {
              -webkit-transform: scale(1.3) translate(0px);
            }
          }
          @-webkit-keyframes cssAnimation {
            from {
              -webkit-transform: scale(1) translate(0px);
            }
            to {
              -webkit-transform: scale(1.3) translate(0px);
            }
          }

          @media (max-width: 1199px) {
            .form_content {
              max-width: 860px;
            }
          }

          @media (max-width: 991px) {
            .form_content {
              max-width: 660px;
            }
            .search_form {
              padding: 15px 15px;
            }
            .search_form .form_placeholder {
              //   width: 60%;
              flex-grow: 1;
            }
            .search_form .form_button {
              width: 20%;
              display: flex;
              justify-content: flex-end;
              display: -webkit-box;
              display: -moz-box;
              display: -ms-flexbox;
              display: -webkit-flex;
              -webkit-box-pack: end;
              -moz-box-pack: end;
              -ms-flex-pack: end;
              -webkit-justify-content: flex-end;
            }
          }

          @media (max-width: 767px) {
            .form_content {
              max-width: 480px;
              top: -32px;
            }
            .search_form {
              padding: 10px 15px;
            }
            .search_form .form_button .form_submit_button {
              padding: 10px 15px;
            }
          }

          @media (min-width: 480px) and (max-width: 530px) {
            .form_content {
              max-width: 420px;
            }
          }

          @media (max-width: 450px) {
            .form_content {
              max-width: 370px;
            }
            .search_form .form_button .form_submit_button {
              padding: 10px 10px;
            }
            .search_form .form_placeholder .form_placeholder {
              padding: 7px 15px;
            }
            .search_form .form_button .form_submit_button {
              padding: 7px 10px;
            }
          }

          @media (max-width: 400px) {
            .form_content {
              max-width: 310px;
            }
            .search_form {
              padding: 8px 10px;
            }
            .search_form .form_placeholder {
              //   width: 50%;
              flex-grow: 1;
            }
            .search_form .form_button {
              width: 25%;
            }
            .search_form .form_placeholder .form_placeholder {
              padding: 7px 5px;
              font-size: 14px;
            }
            .search_form .form_button .form_submit_button {
              padding: 5px 10px;
            }
          }

          @media (min-width: 300px) and (max-width: 350px) {
            .form_content {
              max-width: 270px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default GlobalSearch;
