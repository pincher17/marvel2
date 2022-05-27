import React from "react";
import s from "./SkeletonComicInfo.module.css";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';



const SkeletonComicInfo = (props) => {

  
  return (
    <div className={s.wrapper_all}>
    <Stack spacing={1}>
    <div className={s.wrapper}>
      <div className={s.img}>
      <Skeleton variant="rectangular" animation="wave" width={300} height={450} />
      </div>
      <div className={s.wrapper_info}>
      <Skeleton variant="rectangular" animation="wave" width={400} height={40} />
      <div className={s.title}>
      <Skeleton variant="rectangular" animation="wave" width={150} height={20} />
      </div>
      <Skeleton animation="wave" variant="text" className={s.text} />
      <Skeleton animation="wave" variant="text" className={s.text} />
      <Skeleton animation="wave" variant="text" className={s.text} />
      <Skeleton animation="wave" variant="text" className={s.text} />
      <Skeleton animation="wave" variant="text" className={s.text} />
      </div>
      </div>
    </Stack>
    </div>
  );
};


export default SkeletonComicInfo;
