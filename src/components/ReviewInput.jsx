import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../redux/reducers/reviewInputReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../css/review.css";
import { useNavigate } from "react-router-dom";

const ReviewInput = (props) => {
  const { id } = props;
  console.log(id);

  // 구매티셔츠 정보, 리뷰정보
  const reviewFile = useSelector((state) => state.reviewInput.reviewlist);
  console.log(reviewFile);

  const dispatch = useDispatch();

  const array = [1, 2, 3, 4, 5];

  const navigate = useNavigate();

  return (
    <div>
      <div className="review-box">
        {id == reviewFile.productID ? (
          <div>
            {reviewFile.map((review, i) => (
              <div className="review-container" key={i}>
                <div className="review-context-both">
                  <div>
                    {/* 이미지가 첨부되면 첨부파일을 출력, 첨부하지 않으면 상품 썸네일을 출력 */}
                    {/* {console.log(review.category)} */}

                    {review.img ? (
                      <img
                        src={reviewFile[i].img}
                        alt=""
                        style={{ width: "120px", height: "130px" }}
                      />
                    ) : review && review.category == "short" ? (
                      <img
                        src={require(`../img/shirts-img/short/${review.thumbnail}`)}
                        style={{
                          width: "120px",
                          height: "130px",
                        }}
                      ></img>
                    ) : (
                      <img
                        src={require(`../img/shirts-img/long/${review.thumbnail}`)}
                        style={{
                          width: "120px",
                          height: "130px",
                        }}
                      ></img>
                    )}
                  </div>
                  <div className="review-context">
                    <span>
                      <b>{review.userID}</b>
                    </span>
                    <span>
                      {array.map((el, i) => (
                        <FontAwesomeIcon
                          icon={faStar}
                          key={el}
                          className={
                            review.star >= array[i] ? "yellowStar" : ""
                          }
                        />
                      ))}
                    </span>
                    <div className="review-context-product">
                      <span>{review.category}</span>
                      <span>{review.productName}</span>
                      <span>({review.color})</span>
                      <span>{review.size}</span>
                    </div>
                    <span>{review.comment}</span>
                  </div>
                </div>

                <div className="review-option">
                  {/* 리뷰 등록날짜 정보 */}
                  <span>{review.date}</span>
                  <div className="review-button">
                    <button
                      onClick={() => {
                        navigate("/mypage/review", { state: review });
                      }}
                    >
                      수정
                    </button>
                    <button onClick={() => dispatch(deleteReview(review))}>
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ReviewInput;
