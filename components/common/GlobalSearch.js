import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import TuneIcon from "@mui/icons-material/Tune";
const GlobalSearch = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="realock_form_content">
        <form className="search_form_realock" onSubmit={handleSubmit}>
          <div className="city_icon">
            <div className="svg_icon">
              <MapsHomeWorkIcon />
            </div>
          </div>
          <div className="realock_form_placeholder">
            <input
              className="form_placeholder"
              type="text"
              placeholder="지역명, 대학교, 지하철 역으로 검색..."
            />
          </div>
          <div className="filter_icon">
            <div className="svg_icon">
              <TuneIcon />
            </div>
          </div>
          <div className="realock_form_button">
            <input
              className="form_submit_button"
              type="submit"
              name="submit"
              value="검색"
            />
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .container {
            position: relative;
            margin-bottom: 120px;
          }

          .realock_form_content {
            position: absolute;
            top: -38px;
            left: 0px;
            right: 0px;
            z-index: 1;
            margin: 0px auto;
            max-width: 1030px;
            width: 100%;
          }

          .search_form_realock {
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

          .search_form_realock .city_icon {
            width: 5%;
          }

          .search_form_realock .city_icon .svg_icon {
            font-size: 24px;
            color: #000000;
          }

          .search_form_realock .realock_form_placeholder {
            width: 70%;
          }

          .search_form_realock .realock_form_placeholder .form_placeholder {
            width: 100%;
            border: none;
            font-family: lato-semi-bold;
            font-size: 16px;
            padding: 10px 15px;
          }

          .search_form_realock
            .realock_form_placeholder
            .form_placeholder:focus {
            outline: 2px solid #76c1b2;
            border-radius: 5px;
            color: #000000;
          }

          .search_form_realock .filter_icon {
            width: 10%;
            margin-right: 20px;
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

          .search_form_realock .filter_icon .svg_icon {
            width: 50px;
            height: 50px;
            border: 2px solid #76c1b2;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            -webkit-box-pack: center;
            -moz-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
          }

          .search_form_realock .filter_icon .svg_icon:hover {
            border: 2px solid #555555 !important;
            cursor: pointer;
          }

          .search_form_realock .realock_form_button {
            width: 15%;
            text-align: end;
          }

          .search_form_realock .realock_form_button .form_submit_button {
            font-family: proxima-nova-bold;
            font-size: 16px;
            color: #ffffff;
            background-color: #76c1b2;
            text-transform: capitalize;
            border: 3px solid #76c1b2;
            border-radius: 10px;
            padding: 10px 40px;
            transition: all 0.3s ease-in-out;
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
          }

          .search_form_realock .realock_form_button .form_submit_button:hover {
            background-color: #555555;
            border: 3px solid #555555;
            cursor: pointer;
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

          /***************** Media Query *******************/
          @media (max-width: 1199px) {
            .realock_form_content {
              max-width: 860px;
            }
          }

          @media (max-width: 991px) {
            .realock_form_content {
              max-width: 660px;
            }
            .search_form_realock {
              padding: 15px 15px;
            }
            .search_form_realock .city_icon {
              width: 10%;
              text-align: center;
            }
            .search_form_realock .realock_form_placeholder {
              width: 60%;
            }
            .search_form_realock .filter_icon {
              padding-right: 0px;
              width: 15%;
            }
            .search_form_realock .filter_icon .svg {
              margin-right: 10px;
            }
            .search_form_realock .realock_form_button {
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
            .realock_form_content {
              max-width: 480px;
              top: -32px;
            }
            .search_form_realock {
              padding: 10px 15px;
            }
            .search_form_realock .city_icon {
              display: none;
            }
            .search_form_realock .realock_form_button .form_submit_button {
              padding: 10px 15px;
            }
          }

          @media (min-width: 480px) and (max-width: 530px) {
            .realock_form_content {
              max-width: 420px;
            }
          }

          @media (max-width: 450px) {
            .realock_form_content {
              max-width: 370px;
            }
            .search_form_realock .filter_icon .svg_icon {
              width: 40px;
              height: 40px;
            }
            .search_form_realock .realock_form_button .form_submit_button {
              padding: 10px 10px;
            }
            .search_form_realock .realock_form_placeholder .form_placeholder {
              padding: 7px 15px;
            }
            .search_form_realock .realock_form_button .form_submit_button {
              padding: 7px 10px;
            }
          }

          @media (max-width: 400px) {
            .realock_form_content {
              max-width: 310px;
            }
            .search_form_realock {
              padding: 8px 10px;
            }
            .search_form_realock .realock_form_placeholder {
              width: 50%;
            }
            .search_form_realock .filter_icon {
              width: 20%;
            }
            .search_form_realock .realock_form_button {
              width: 25%;
            }
            .search_form_realock .realock_form_placeholder .form_placeholder {
              padding: 7px 5px;
              font-size: 14px;
            }
            .search_form_realock .realock_form_button .form_submit_button {
              padding: 5px 10px;
            }
          }

          @media (min-width: 300px) and (max-width: 350px) {
            .realock_form_content {
              max-width: 270px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default GlobalSearch;
