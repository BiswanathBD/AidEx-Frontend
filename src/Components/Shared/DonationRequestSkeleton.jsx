import { useTheme } from "../../Context/ThemeContext";

const DonationRequestSkeleton = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative rounded-3xl p-8 text-center my-12 animate-pulse ${
        isDark
          ? "bg-linear-to-t from-black to-[#f87898]/5 shadow-2xl shadow-black/50"
          : "bg-white shadow-2xl shadow-gray-200/50"
      }`}
    >
      {/* Large circular blood group skeleton - positioned outside card */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className={`w-42 h-42 rounded-full flex items-center justify-center shadow-2xl ${
            isDark
              ? "bg-linear-to-br from-[#f87898] via-[#f45f7b] to-[#e91e63] shadow-[#f87898]/30"
              : "bg-linear-to-br from-[#f87898] via-[#f45f7b] to-[#e91e63] shadow-[#f87898]/30"
          }`}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-[#f87898] blur-2xl opacity-30 animate-pulse"></div>
          {/* Shimmer effect */}
          <div
            className={`absolute inset-0 rounded-full ${
              isDark
                ? "bg-linear-to-r from-transparent via-white/20 to-transparent"
                : "bg-linear-to-r from-transparent via-white/30 to-transparent"
            } animate-shimmer`}
          ></div>
        </div>
      </div>

      {/* Content with top padding to account for circle */}
      <div className="pt-20">
        {/* Recipient name skeleton */}
        <div
          className={`h-8 rounded-lg mb-6 mx-auto ${
            isDark ? "bg-white/10" : "bg-black/10"
          }`}
          style={{ width: "60%" }}
        >
          <div
            className={`h-full rounded-lg ${
              isDark
                ? "bg-linear-to-r from-transparent via-white/20 to-transparent"
                : "bg-linear-to-r from-transparent via-black/20 to-transparent"
            } animate-shimmer`}
          ></div>
        </div>

        {/* Details section skeleton */}
        <div className="space-y-3 mb-8">
          {/* Location skeleton */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f87898]/10">
              <div
                className={`w-full h-full rounded-full ${
                  isDark
                    ? "bg-linear-to-r from-transparent via-[#f87898]/30 to-transparent"
                    : "bg-linear-to-r from-transparent via-[#f87898]/40 to-transparent"
                } animate-shimmer`}
              ></div>
            </div>
            <div
              className={`h-4 rounded ${
                isDark ? "bg-white/10" : "bg-black/10"
              }`}
              style={{ width: "120px" }}
            >
              <div
                className={`h-full rounded ${
                  isDark
                    ? "bg-linear-to-r from-transparent via-white/20 to-transparent"
                    : "bg-linear-to-r from-transparent via-black/20 to-transparent"
                } animate-shimmer`}
              ></div>
            </div>
          </div>

          {/* Time skeleton */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f87898]/10">
              <div
                className={`w-full h-full rounded-full ${
                  isDark
                    ? "bg-linear-to-r from-transparent via-[#f87898]/30 to-transparent"
                    : "bg-linear-to-r from-transparent via-[#f87898]/40 to-transparent"
                } animate-shimmer`}
              ></div>
            </div>
            <div
              className={`h-4 rounded ${
                isDark ? "bg-white/10" : "bg-black/10"
              }`}
              style={{ width: "140px" }}
            >
              <div
                className={`h-full rounded ${
                  isDark
                    ? "bg-linear-to-r from-transparent via-white/20 to-transparent"
                    : "bg-linear-to-r from-transparent via-black/20 to-transparent"
                } animate-shimmer`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className="h-12 rounded-lg w-full bg-[#f87898]">
        <div
          className={`h-full rounded-lg ${
            isDark
              ? "bg-linear-to-r from-transparent via-white/20 to-transparent"
              : "bg-linear-to-r from-transparent via-white/30 to-transparent"
          } animate-shimmer`}
        ></div>
      </div>

      {/* Decorative elements skeleton */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-[#f87898] rounded-full opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#f87898] rounded-full opacity-40"></div>
    </div>
  );
};

export default DonationRequestSkeleton;
