import React from "react";
import { Card, CardBody, Button, Chip, Pagination } from "@heroui/react";
// import { Icon } from "@iconify/react"; // Removed unused import
import { motion } from "framer-motion";
import SectionTitle from "../../components/ui/SectionTitle";
// import { Event } from "../events/types"; // Removed unused import and missing module

// Import events from EventsPage mock
import { mockEvents } from "../events";

// Mock Departments
const mockDepartments = [
  {
    id: "coe",
    name: "COE - College of Engineering",
    description:
      "Focus on cutting-edge technologies in AI, ML, Web Development, Robotics, and core engineering innovations.",
    image: "https://img.heroui.chat/image/coe?w=400&h=200",
    events: mockEvents.filter(
      (e: any) =>
        e.department === "Computer Science" || e.department === "Electronics"
    ),
  },
  {
    id: "cec",
    name: "CEC - Cultural & Extracurricular Council",
    description:
      "Encouraging students to express their creativity and passion in arts, culture, literature, music, and performance.",
    image: "https://img.heroui.chat/image/cec?w=400&h=200",
    events: mockEvents.filter(
      (e: any) =>
        e.department === "Cultural Affairs" || e.department === "Fine Arts"
    ),
  },
  {
    id: "cbsa",
    name: "CBSA - College of Business Studies & Analytics",
    description:
      "Dedicated to business, entrepreneurship, financial analytics, and modern corporate innovations.",
    image: "https://img.heroui.chat/image/cbsa?w=400&h=200",
    events: mockEvents.filter((e: any) => e.department === "Business"),
  },
  {
    id: "hm",
    name: "HM - Environmental & Sustainability Sciences",
    description:
      "Committed to building a sustainable future with environmental awareness, green initiatives, and eco-friendly practices.",
    image: "https://img.heroui.chat/image/hm?w=400&h=200",
    events: mockEvents.filter(
      (e: any) => e.department === "Environmental Science"
    ),
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const DepartmentsPage: React.FC = () => {
  const [isGridView] = React.useState(true); // Remove unused setter
  const [currentPage, setCurrentPage] = React.useState(1);
  const departmentsPerPage = 4;

  // Paginate departments
  const paginatedDepartments = React.useMemo(() => {
    const startIndex = (currentPage - 1) * departmentsPerPage;
    return mockDepartments.slice(startIndex, startIndex + departmentsPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(mockDepartments.length / departmentsPerPage);

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Explore Departments"
          subtitle="Learn more about departments and their events."
        />

        {isGridView ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
            key="grid-view"
          >
            {paginatedDepartments.map((dept) => (
              <motion.div key={dept.id} variants={item}>
                <Card
                  className="border border-divider bg-content1 h-full flex flex-col"
                  shadow="none"
                >
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <CardBody className="p-6 flex flex-col flex-grow">
                    <h3 className="text-foreground font-semibold text-lg mb-2">
                      {dept.name}
                    </h3>
                    <p className="text-foreground-400 text-sm flex-grow">
                      {dept.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {dept.events.slice(0, 3).map((e: any) => (
                        <Chip
                          key={e.id}
                          color="primary"
                          variant="flat"
                          size="sm"
                        >
                          {e.title}
                        </Chip>
                      ))}
                      {dept.events.length > 3 && (
                        <Chip size="sm" variant="bordered">
                          +{dept.events.length - 3} more
                        </Chip>
                      )}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        color="primary"
                        as="a"
                        href={`/departments/${dept.id}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
            key="list-view"
          >
            {paginatedDepartments.map((dept) => (
              <motion.div key={dept.id} variants={item}>
                <Card
                  className="border border-divider bg-content1"
                  shadow="none"
                >
                  <CardBody className="p-6 flex flex-col md:flex-row gap-6">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="w-full md:w-1/3 h-40 object-cover rounded-lg"
                    />
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-foreground font-semibold text-lg mb-2">
                        {dept.name}
                      </h3>
                      <p className="text-foreground-400 text-sm mb-4">
                        {dept.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dept.events.slice(0, 5).map((e: any) => (
                          <Chip
                            key={e.id}
                            color="success"
                            variant="flat"
                            size="sm"
                          >
                            {e.title}
                          </Chip>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button
                          color="primary"
                          as="a"
                          href={`/departments/${dept.id}`}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={setCurrentPage}
              color="primary"
              showControls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsPage;
