import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import Button from "../MultiStyledButton/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Store/reduxHooks.tsx/hooks";
import { productsAction } from "../../Store/StoreSlices/productsSlice/slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  //
  const filteredProducts = useAppSelector(
    (state) => state.productsSlice.filteredProducts
  );
  const isFiltering = useAppSelector(
    (state) => state.productsSlice.isFiltering
  );
  const ArrayIsNotEmpty = filteredProducts.length > 1;
  //
  const offset = useAppSelector((state) => state.productsSlice.offset);
  const showUpArrow = offset > 12;
  //
  const openFilter = () => {
    dispatch(productsAction.setFilterIsOpen(true));
  };
  const showMore = () => {
    dispatch(productsAction.increaseOffsetBy(12));
  };
  const toTop = () => {
    dispatch(productsAction.increaseOffsetBy(-offset + 12));
    scrollTo({ top: 0, behavior: "smooth" });
  };
  const resetFiler = () => {
    dispatch(productsAction.setFilterValues(""));
    dispatch(productsAction.setIsFiltring(false));
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <span className=" flex justify-between items-center">
        <div className="-space-x-1">
          <Button
            title="Filter"
            onClick={openFilter}
            additionalStyles="font-handWrite"
          />
          <FontAwesomeIcon
            onClick={openFilter}
            icon={faArrowDownShortWide}
            className="text-black  cursor-pointer"
          />
        </div>
        {isFiltering && (
          <Button
            title="Reset"
            variants="redButtonFree"
            onClick={resetFiler}
            additionalStyles="mx-4 px-1 py-0 text-xs  "
          />
        )}
      </span>
      <motion.ul
        variants={{ hidden: { y: 1 }, visible: { y: 0 } }}
        initial="hidden"
        animate="visible"
        className={`relative w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}>
        {filteredProducts &&
          ArrayIsNotEmpty &&
          filteredProducts
            .filter((_, i) => i < offset)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </motion.ul>
      <Button
        title="Show More"
        variants="redButton"
        additionalStyles="mt-2"
        onClick={showMore}
      />
      {showUpArrow && (
        <FontAwesomeIcon
          onClick={toTop}
          className="text-subColor_4  cursor-pointer text-3xl absolute bottom-4 animate-bounce right-[2%]"
          icon={faArrowAltCircleUp}
        />
      )}
    </>
  );
};

export default Products;
