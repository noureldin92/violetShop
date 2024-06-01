import { motion } from "framer-motion";
import RatingStarsSVG from "./RatingStarsSVG";
import product from "./types/Types";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../Store/reduxHooks.tsx/hooks";
import { productsDetailsActions } from "../../Store/ProductsDetailsSlice/ProductsDetailsSlice";

const Product: React.FC<{ product: product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateTo = () => {
    dispatch(productsDetailsActions.resetReviewsOffset());
    dispatch(productsDetailsActions.setUserRateValue(0));
    dispatch(productsDetailsActions.setAllowGetCategories());
    navigate(`/productDetails/${product.id}`);
  };
  return (
    <motion.li
      onClick={navigateTo}
      variants={{ visible: { opacity: 1, scale: 1 } }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate="visible"
      className="flex flex-col justify-between h-full p-2 bg-white rin ring-lightestViolet dark:ring-darkViolet/50 rounded-lg shadow-md dark:bg-middarkViolet">
      <header className="w-full min-h-12">
        <h2 className="text-simidarkViolet dark:text-white text-md font-handWrite font-bold text-center ">
          {product.title}
        </h2>
      </header>
      <div className="flex flex-col justify-between flex-1 ">
        <div className="flex justify-center gap-x-2">
          <div className="ms-1 flex flex-col self-end">
            <RatingStarsSVG rating={product.rating} />
            <p className="text-xs text-red-500">
              -{product.discountPercentage} $ off
            </p>
          </div>
          <img
            src={product.thumbnail}
            className="bg-productLighBG dark:bg-lightViolet/50 w-36 h-36 object-cover rounded-lg drop-shadow-xl shadow-xl dark:shadow-black/20  "
            alt={product.title}
          />
        </div>
      </div>
      <footer className="bg-lightViolet/80 px-2 py-1 rounded-lg mt-2">
        <p className="text-sm text-white/70 dark:text-gray-300 line-clamp-2">
          {product.description}
        </p>
        <p className="text-right text-md font-semibold text-white">
          ${product.price}
        </p>
      </footer>
    </motion.li>
  );
};

export default Product;
