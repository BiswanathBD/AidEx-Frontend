import { useTheme } from "../Context/ThemeContext";
import {
  FaUsers,
  FaHeart,
  FaGlobeAsia,
  FaAward,
  FaHandsHelping,
  FaSchool,
  FaBuilding,
  FaUserFriends,
} from "react-icons/fa";
import { MdVolunteerActivism, MdCampaign } from "react-icons/md";

const impactData = [
  {
    icon: <FaUsers />,
    title: "Community Volunteers",
    count: "5,000+",
    description:
      "Active volunteers organizing blood drives and awareness campaigns across Bangladesh",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <FaSchool />,
    title: "Educational Programs",
    count: "200+",
    description:
      "Schools and universities participating in blood donation awareness programs",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <FaBuilding />,
    title: "Corporate Partners",
    count: "150+",
    description:
      "Companies supporting employee blood donation drives and health initiatives",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <MdCampaign />,
    title: "Awareness Campaigns",
    count: "50+",
    description:
      "Public awareness campaigns reaching millions across social media and traditional media",
    color: "from-orange-500 to-orange-600",
  },
];

const initiativeData = [
  {
    icon: <FaHandsHelping />,
    title: "Blood Drive Events",
    description:
      "Regular community blood drives in schools, offices, and public spaces",
    achievements: [
      "Monthly drives in 64 districts",
      "Mobile blood collection units",
      "Weekend community events",
      "Festival season campaigns",
    ],
  },
  {
    icon: <MdVolunteerActivism />,
    title: "Volunteer Training",
    description:
      "Comprehensive training programs for community volunteers and coordinators",
    achievements: [
      "First aid certification",
      "Donor counseling skills",
      "Event organization training",
      "Digital platform usage",
    ],
  },
  {
    icon: <FaAward />,
    title: "Recognition Programs",
    description:
      "Honoring outstanding donors, volunteers, and community champions",
    achievements: [
      "Annual donor appreciation",
      "Volunteer of the month",
      "Corporate partnership awards",
      "Community impact certificates",
    ],
  },
  {
    icon: <FaGlobeAsia />,
    title: "Digital Outreach",
    description:
      "Leveraging technology to spread awareness and connect communities",
    achievements: [
      "Social media campaigns",
      "Mobile app notifications",
      "SMS awareness programs",
      "Online education resources",
    ],
  },
];

const CommunityImpact = () => {
  const { isDark } = useTheme();

  return (
    <section className="py-16">
      <div>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                isDark ? "bg-[#f87898]/10" : "bg-[#f87898]/5"
              }`}
            >
              <FaUserFriends className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Building a <span className="text-[#f87898]">Stronger</span>{" "}
            Community
          </h2>
          <p
            className={`max-w-3xl mx-auto text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Beyond individual donations, we're creating a nationwide movement
            that brings communities together to save lives and build a culture
            of giving.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {impactData.map((impact, index) => (
            <div
              key={index}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center group hover:scale-101 transition-all duration-300 ${
                isDark
                  ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                  : "bg-white hover:shadow-lg"
              }`}
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  }`}
                >
                  <div className="text-[#f87898] text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110">
                    {impact.icon}
                  </div>
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-[#f87898] mb-2">
                {impact.count}
              </div>

              <h3
                className={`text-sm sm:text-base font-semibold mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {impact.title}
              </h3>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {impact.description}
              </p>
            </div>
          ))}
        </div>

        {/* Community Initiatives */}
        <div className="mb-12 sm:mb-16">
          <h3
            className={`text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Our Community <span className="text-[#f87898]">Initiatives</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {initiativeData.map((initiative, index) => (
              <div
                key={index}
                className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl group hover:scale-101 transition-all duration-300 ${
                  isDark
                    ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div
                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                    }`}
                  >
                    <div className="text-[#f87898] text-lg sm:text-xl">
                      {initiative.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-lg sm:text-xl font-bold mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {initiative.title}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {initiative.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {initiative.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#f87898] shrink-0" />
                      <span
                        className={`text-xs sm:text-sm ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Spotlight */}
        <div
          className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl ${
            isDark
              ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
              : "bg-white hover:shadow-lg"
          } transition-all duration-300`}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3
              className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Community <span className="text-[#f87898]">Spotlight</span>
            </h3>
            <p
              className={`max-w-2xl mx-auto text-sm sm:text-base ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Every month, we celebrate the incredible contributions of our
              community members who go above and beyond to save lives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center ${
                  isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                }`}
              >
                <FaHeart className="text-[#f87898] text-xl sm:text-2xl" />
              </div>
              <h4
                className={`font-bold mb-2 text-sm sm:text-base ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Hero of the Month
              </h4>
              <p
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Recognizing donors who have made exceptional contributions to
                saving lives
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center ${
                  isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                }`}
              >
                <FaUsers className="text-[#f87898] text-xl sm:text-2xl" />
              </div>
              <h4
                className={`font-bold mb-2 text-sm sm:text-base ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Community Champion
              </h4>
              <p
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Honoring volunteers who organize successful blood drives and
                awareness events
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center ${
                  isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                }`}
              >
                <FaAward className="text-[#f87898] text-xl sm:text-2xl" />
              </div>
              <h4
                className={`font-bold mb-2 text-sm sm:text-base ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Partner Excellence
              </h4>
              <p
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Celebrating organizations that support our mission through
                partnerships
              </p>
            </div>
          </div>
        </div>

        {/* Join Community CTA */}
        <div
          className={`mt-12 sm:mt-16 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center ${
            isDark
              ? "bg-[#f87898]/5 hover:bg-[#f87898]/10"
              : "bg-[#f87898]/5 hover:bg-[#f87898]/10"
          } transition-all duration-300`}
        >
          <h3
            className={`text-lg sm:text-xl font-bold mb-2 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Be Part of Something Bigger
          </h3>
          <p
            className={`mb-4 sm:mb-6 text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join our community of heroes and help us build a stronger, more
            caring society where no one suffers due to blood shortage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
