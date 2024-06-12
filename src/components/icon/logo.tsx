const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="81"
      height="26"
      viewBox="0 0 81 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32.0939 8.58929H33.1734L36.5136 13.0065L39.8792 8.58929H40.946V17.4488H39.7776V10.5608L36.5263 14.8533L33.275 10.5608V17.4488H32.0939V8.58929ZM45.2261 17.5735C44.5149 17.5735 43.9201 17.403 43.4417 17.0619C42.9633 16.7209 42.6987 16.2467 42.6479 15.6394H43.7655C43.8333 15.9888 44.0047 16.2467 44.2799 16.4131C44.5551 16.5794 44.8747 16.6626 45.2388 16.6626C45.6029 16.6626 45.8971 16.5919 46.1215 16.4505C46.3459 16.3091 46.458 16.1053 46.458 15.8391C46.458 15.5895 46.3755 15.3857 46.2104 15.2276C46.0453 15.0696 45.7764 14.9407 45.4039 14.8408L44.4895 14.6037C43.3972 14.3209 42.8511 13.7095 42.8511 12.7695C42.8511 12.262 43.0564 11.8544 43.4671 11.5466C43.8777 11.2388 44.4048 11.0849 45.0483 11.0849C45.7002 11.0849 46.2358 11.2534 46.6549 11.5903C47.074 11.9272 47.309 12.3535 47.3598 12.8693H46.2675C46.1829 12.5948 46.0326 12.3785 45.8167 12.2204C45.6008 12.0624 45.3446 11.9833 45.0483 11.9833C44.735 11.9833 44.4747 12.054 44.2672 12.1955C44.0598 12.3369 43.956 12.5241 43.956 12.757C43.956 12.9816 44.0323 13.1646 44.1847 13.306C44.3371 13.4474 44.5826 13.5639 44.9213 13.6554L45.9373 13.9174C47.0211 14.1836 47.563 14.7992 47.563 15.7642C47.563 16.3632 47.3471 16.8144 46.9152 17.1181C46.4834 17.4217 45.9204 17.5735 45.2261 17.5735ZM51.9065 20.1815C51.0683 20.1815 50.3719 19.9797 49.8173 19.5763C49.2627 19.1728 48.9346 18.655 48.833 18.0227H49.8998C50.1793 18.8297 50.8566 19.2331 51.9319 19.2331C52.5331 19.2331 53.0178 19.0439 53.3861 18.6654C53.7544 18.2869 53.9386 17.7565 53.9386 17.0744V16.3382C53.71 16.671 53.4009 16.9372 53.0115 17.1368C52.622 17.3365 52.1944 17.4363 51.7287 17.4363C50.8397 17.4363 50.0988 17.1306 49.5061 16.5191C48.9135 15.9077 48.6171 15.1528 48.6171 14.2544C48.6171 13.3643 48.9156 12.6135 49.5125 12.0021C50.1094 11.3906 50.8482 11.0849 51.7287 11.0849C52.1944 11.0849 52.622 11.1847 53.0115 11.3844C53.4009 11.584 53.71 11.8461 53.9386 12.1705V11.2097H55.0308V17.0619C55.0308 18.0602 54.7366 18.8297 54.1481 19.3704C53.5597 19.9111 52.8125 20.1815 51.9065 20.1815ZM50.3317 15.8266C50.7296 16.2342 51.2461 16.438 51.8811 16.438C52.5161 16.438 53.0326 16.2321 53.4306 15.8204C53.8285 15.4086 54.0275 14.8866 54.0275 14.2544C54.0275 13.6221 53.8264 13.1001 53.4242 12.6884C53.022 12.2766 52.5077 12.0707 51.8811 12.0707C51.2546 12.0707 50.7402 12.2766 50.338 12.6884C49.9358 13.1001 49.7347 13.6221 49.7347 14.2544C49.7347 14.8866 49.9337 15.4107 50.3317 15.8266ZM58.1805 20.0567H57.0883V11.2097H58.1805V12.1705C58.4007 11.8544 58.7118 11.5944 59.114 11.3906C59.5162 11.1868 59.9501 11.0849 60.4158 11.0849C61.2964 11.0849 62.0351 11.401 62.632 12.0332C63.229 12.6655 63.5274 13.4308 63.5274 14.3292C63.5274 15.2276 63.229 15.993 62.632 16.6252C62.0351 17.2574 61.2964 17.5735 60.4158 17.5735C59.9501 17.5735 59.5162 17.4716 59.114 17.2678C58.7118 17.064 58.4007 16.8041 58.1805 16.4879V20.0567ZM58.7013 15.9389C59.1077 16.3715 59.6242 16.5878 60.2507 16.5878C60.8773 16.5878 61.3937 16.3715 61.8002 15.9389C62.2066 15.5063 62.4098 14.9698 62.4098 14.3292C62.4098 13.6887 62.2066 13.1521 61.8002 12.7195C61.3937 12.287 60.8773 12.0707 60.2507 12.0707C59.6242 12.0707 59.1077 12.287 58.7013 12.7195C58.2948 13.1521 58.0916 13.6887 58.0916 14.3292C58.0916 14.9698 58.2948 15.5063 58.7013 15.9389ZM67.9218 17.5735C66.965 17.5735 66.1712 17.2595 65.5404 16.6314C64.9096 16.0034 64.5943 15.236 64.5943 14.3292C64.5943 13.4225 64.9096 12.6551 65.5404 12.027C66.1712 11.3989 66.965 11.0849 67.9218 11.0849C68.8701 11.0849 69.6596 11.3989 70.2904 12.027C70.9212 12.6551 71.2366 13.4225 71.2366 14.3292C71.2366 15.236 70.9212 16.0034 70.2904 16.6314C69.6596 17.2595 68.8701 17.5735 67.9218 17.5735ZM66.3215 15.9264C66.7364 16.359 67.2698 16.5753 67.9218 16.5753C68.5737 16.5753 69.1029 16.359 69.5093 15.9264C69.9157 15.4938 70.1189 14.9614 70.1189 14.3292C70.1189 13.697 69.9157 13.1646 69.5093 12.732C69.1029 12.2994 68.5737 12.0832 67.9218 12.0832C67.2698 12.0832 66.7385 12.2994 66.3279 12.732C65.9172 13.1646 65.7119 13.697 65.7119 14.3292C65.7119 14.9614 65.9151 15.4938 66.3215 15.9264ZM72.7987 17.4488V11.2097H73.891V12.4201C74.0095 12.0374 74.2402 11.7296 74.5831 11.4967C74.926 11.2638 75.288 11.1473 75.669 11.1473C75.8553 11.1473 76.0204 11.1639 76.1643 11.1972V12.3078C76.0119 12.2412 75.813 12.2079 75.5674 12.2079C75.1271 12.2079 74.7377 12.3951 74.399 12.7695C74.0603 13.1438 73.891 13.672 73.891 14.3542V17.4488H72.7987ZM79.911 17.5111C79.3267 17.5111 78.8568 17.3489 78.5012 17.0245C78.1456 16.7001 77.9678 16.2259 77.9678 15.602V12.1955H76.6216V11.2097H77.9678V9.47523H79.06V11.2097H80.8889V12.1955H79.06V15.4647C79.06 15.8557 79.1447 16.1302 79.314 16.2883C79.4834 16.4463 79.7501 16.5254 80.1142 16.5254C80.4359 16.5254 80.6942 16.4838 80.8889 16.4006V17.3614C80.5841 17.4612 80.2581 17.5111 79.911 17.5111ZM13.2316 0C16.8854 0 20.1933 1.45508 22.5877 3.80761C24.9822 6.16015 26.4632 9.41015 26.4632 13C26.4632 16.5899 24.9822 19.8399 22.5877 22.1924C20.1933 24.5449 16.8854 26 13.2316 26C9.57779 26 6.2699 24.5449 3.87545 22.1924C1.481 19.8399 0 16.5899 0 13C0 9.41015 1.481 6.16015 3.87545 3.80761C6.2699 1.45508 9.57779 0 13.2316 0ZM9.34058 22.02L9.30874 22.0347C8.3601 22.4693 7.37192 22.8345 6.35096 23.1238C8.3188 24.418 10.6855 25.1725 13.2316 25.1725C13.3248 25.1725 13.4177 25.1715 13.5104 25.1695C12.7608 24.3932 12.0736 23.5582 11.4566 22.6724C11.2633 22.7403 11.055 22.7772 10.8379 22.7772C10.33 22.7772 9.87007 22.5749 9.53717 22.2479C9.46549 22.1774 9.3997 22.1012 9.34058 22.02ZM17.1582 15.7174L17.0046 15.92C15.7377 17.5646 14.2195 19.0121 12.5061 20.2071C12.6161 20.4388 12.6775 20.6973 12.6775 20.9699C12.6775 21.4562 12.482 21.8977 12.164 22.2226C12.8866 23.2578 13.7094 24.2203 14.6186 25.0967C18.9353 24.6246 22.5821 21.9732 24.394 18.288C22.2221 16.9934 19.7745 16.1018 17.1582 15.7174ZM6.06216 17.2467L5.98817 17.2801C4.78782 17.8262 3.65306 18.4878 2.59869 19.2505C3.35723 20.4943 4.33588 21.5939 5.4815 22.4974C6.71171 22.1927 7.89556 21.7739 9.02088 21.2533C9.00606 21.1609 8.99837 21.0663 8.99837 20.9699C8.99837 20.4708 9.20427 20.0189 9.53717 19.6918C9.58288 19.6469 9.63099 19.6044 9.68129 19.5644C9.55563 19.2898 9.43611 19.012 9.32283 18.7311C9.12506 18.7712 8.92016 18.7923 8.71025 18.7923C7.87789 18.7923 7.12433 18.4608 6.57886 17.9249C6.37546 17.7251 6.20099 17.4968 6.06216 17.2467ZM10.8379 19.99C10.5625 19.99 10.3132 20.0996 10.1327 20.277C9.95222 20.4543 9.84059 20.6993 9.84059 20.9699C9.84059 21.2404 9.95222 21.4854 10.1327 21.6627C10.3132 21.8401 10.5625 21.9497 10.8379 21.9497C11.1134 21.9497 11.3627 21.8401 11.5432 21.6627C11.7237 21.4854 11.8353 21.2404 11.8353 20.9699C11.8353 20.6993 11.7237 20.4543 11.5432 20.277C11.3627 20.0996 11.1134 19.99 10.8379 19.99ZM14.229 15.5042C13.3788 15.5042 12.5412 15.5573 11.7195 15.6602C11.7228 15.7167 11.7245 15.7736 11.7245 15.8308C11.7245 16.6486 11.3871 17.389 10.8416 17.9249C10.6289 18.1339 10.3845 18.3118 10.1162 18.4511C10.2189 18.7051 10.327 18.9564 10.4404 19.2049C10.5684 19.1771 10.7014 19.1625 10.8379 19.1625C11.2714 19.1625 11.6698 19.3098 11.9842 19.5562C13.5787 18.4492 14.9979 17.1145 16.1926 15.5997C15.5468 15.5364 14.8917 15.5042 14.229 15.5042ZM6.76768 8.47932L6.74989 8.49007C4.56747 9.81132 2.58154 11.4158 0.845215 13.2514C0.883899 15.1459 1.36341 16.934 2.1869 18.521C3.30061 17.7244 4.49898 17.0354 5.76634 16.4696C5.72028 16.2639 5.69601 16.0501 5.69601 15.8308C5.69601 15.013 6.03339 14.2727 6.57886 13.7367C6.95393 13.3682 7.42738 13.0964 7.95718 12.9625C7.91282 12.4219 7.8902 11.8752 7.8902 11.3233C7.8902 10.6683 7.92206 10.0205 7.98434 9.38153C7.6265 9.25949 7.30588 9.05923 7.04365 8.80159C6.94258 8.70229 6.85019 8.59447 6.76768 8.47932ZM8.71025 13.6968C8.11046 13.6968 7.56745 13.9357 7.1744 14.3219C6.78134 14.708 6.53823 15.2415 6.53823 15.8308C6.53823 16.4201 6.78134 16.9536 7.1744 17.3398C7.56745 17.726 8.11046 17.9648 8.71025 17.9648C9.31003 17.9648 9.85304 17.726 10.2461 17.3398C10.6392 16.9536 10.8823 16.4201 10.8823 15.8308C10.8823 15.2415 10.6392 14.708 10.2461 14.3219C9.85304 13.9357 9.31003 13.6968 8.71025 13.6968ZM25.0829 9.44049L25.0689 9.39597L25.1469 9.37898C24.1044 9.6086 23.0373 9.7742 21.9501 9.87134C21.8662 10.3308 21.6398 10.7417 21.3175 11.0583C20.9044 11.4642 20.3337 11.7152 19.7033 11.7152C19.6339 11.7152 19.5653 11.7122 19.4974 11.7062C19.0018 12.8432 18.4024 13.9262 17.7112 14.9439L17.6971 14.9644L17.8021 14.9819C20.2986 15.4135 22.6393 16.2894 24.7366 17.5236C25.3073 16.1254 25.621 14.5987 25.621 13V12.9337C25.6142 11.7189 25.4265 10.5463 25.0829 9.44049ZM8.71025 14.459C9.09582 14.459 9.4449 14.6125 9.69758 14.8608C9.95026 15.109 10.1066 15.452 10.1066 15.8308C10.1066 16.2096 9.95026 16.5526 9.69758 16.8009C9.4449 17.0491 9.09582 17.2027 8.71025 17.2027C8.32467 17.2027 7.9756 17.0491 7.72292 16.8009C7.47024 16.5526 7.31395 16.2096 7.31395 15.8308C7.31395 15.452 7.47024 15.109 7.72292 14.8608C7.9756 14.6125 8.32467 14.459 8.71025 14.459ZM8.71025 15.0687C8.49604 15.0687 8.30211 15.154 8.16173 15.2919C8.02135 15.4298 7.93452 15.6204 7.93452 15.8308C7.93452 16.0413 8.02135 16.2318 8.16173 16.3697C8.30211 16.5077 8.49604 16.593 8.71025 16.593C8.92445 16.593 9.11839 16.5077 9.25877 16.3697C9.39915 16.2318 9.48597 16.0413 9.48597 15.8308C9.48597 15.6204 9.39915 15.4298 9.25877 15.2919C9.11839 15.154 8.92445 15.0687 8.71025 15.0687ZM10.5542 8.80159C10.109 9.23894 9.4956 9.51096 8.8175 9.51585C8.76118 10.1109 8.73241 10.7138 8.73241 11.3233C8.73241 11.8441 8.75341 12.3601 8.79463 12.8705C9.59347 12.8921 10.3147 13.219 10.8416 13.7367C11.157 14.0466 11.4029 14.4249 11.5541 14.8469C12.4295 14.7346 13.3224 14.6767 14.229 14.6767C15.0892 14.6767 15.9371 14.7288 16.7697 14.8307C17.5144 13.7844 18.1561 12.662 18.6803 11.478C18.4606 11.3696 18.2612 11.2274 18.0891 11.0583C17.7687 10.7435 17.5431 10.3355 17.458 9.8793C15.1828 9.68406 12.9949 9.18917 10.9356 8.435L10.8759 8.4131C10.7823 8.55332 10.6744 8.68348 10.5542 8.80159ZM4.17689 4.69171L4.14985 4.72017C2.30942 6.66789 1.11014 9.2086 0.881924 12.0182C2.53596 10.3796 4.39017 8.9362 6.40564 7.72667C6.3476 7.51989 6.31659 7.30203 6.31659 7.07705C6.31659 6.79367 6.36578 6.52158 6.45624 6.26857C5.67366 5.789 4.92008 5.26797 4.19866 4.70867L4.17689 4.69171ZM19.7033 8.05695C19.3055 8.05695 18.9454 8.21537 18.6847 8.47151C18.424 8.72765 18.2627 9.08151 18.2627 9.47236C18.2627 9.86322 18.424 10.2171 18.6847 10.4732C18.9454 10.7293 19.3055 10.8878 19.7033 10.8878C20.1012 10.8878 20.4613 10.7293 20.722 10.4732C20.9827 10.2171 21.144 9.86322 21.144 9.47236C21.144 9.08151 20.9827 8.72765 20.722 8.47151C20.4613 8.21537 20.1012 8.05695 19.7033 8.05695ZM20.2919 4.40538L20.1671 4.41024C16.9995 4.56172 13.9687 5.22523 11.1588 6.31834C11.2382 6.55717 11.2812 6.81218 11.2812 7.07705C11.2812 7.27538 11.2571 7.46817 11.2116 7.65277C13.1853 8.37741 15.2815 8.85544 17.4612 9.04874C17.5486 8.59924 17.7726 8.19738 18.0891 7.88641C18.5022 7.48053 19.0729 7.22948 19.7033 7.22948C19.7995 7.22948 19.8942 7.23532 19.9872 7.24665C20.1578 6.3209 20.261 5.37211 20.2919 4.40538ZM21.5651 4.37689C21.4214 4.37689 21.278 4.37793 21.1353 4.38031C21.104 5.44374 20.9888 6.48657 20.7959 7.50255C20.9882 7.60572 21.1638 7.73534 21.3175 7.88641C21.6322 8.19555 21.8554 8.59452 21.944 9.04081C22.9102 8.95171 23.86 8.80659 24.7898 8.60884C24.1632 7.01648 23.205 5.58607 21.9987 4.39913L21.9706 4.37964C21.8356 4.37782 21.7005 4.37689 21.5651 4.37689ZM8.7989 5.46566C8.346 5.46566 7.93598 5.64602 7.63918 5.93763C7.34238 6.22923 7.1588 6.63208 7.1588 7.07705C7.1588 7.52203 7.34238 7.92487 7.63918 8.21648C7.93598 8.50808 8.346 8.68844 8.7989 8.68844C9.2518 8.68844 9.66183 8.50808 9.95863 8.21648C10.2554 7.92487 10.439 7.52203 10.439 7.07705C10.439 6.63208 10.2554 6.22923 9.95863 5.93763C9.66183 5.64602 9.2518 5.46566 8.7989 5.46566ZM13.2316 0.827469C12.761 0.827469 12.2966 0.853241 11.8397 0.903429C11.0326 2.13678 10.3647 3.46626 9.85759 4.87051C10.1178 4.99119 10.3531 5.15499 10.5542 5.35252C10.6279 5.42498 10.6971 5.50199 10.7611 5.58307C13.7199 4.42104 16.9182 3.72209 20.263 3.5775L20.3005 3.57594L20.3004 3.56046C20.2982 3.37033 20.2931 3.18086 20.2853 2.99208C18.2838 1.62717 15.8527 0.827469 13.2316 0.827469ZM10.7432 1.07305L10.6905 1.08372C8.44466 1.54364 6.42163 2.60081 4.78742 4.06742L4.7616 4.09067L4.78182 4.10631C5.44954 4.62065 6.14561 5.10115 6.86728 5.54517C6.9226 5.4779 6.98148 5.41359 7.04365 5.35252C7.49286 4.91117 8.11343 4.63819 8.7989 4.63819C8.88146 4.63819 8.96307 4.64215 9.04356 4.64989C9.48616 3.41245 10.0485 2.23032 10.7168 1.11695L10.7432 1.07305Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo;

// F2F3F5