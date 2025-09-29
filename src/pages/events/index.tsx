import React from "react";
import {
  Input,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Card,
  CardBody,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import EventCard from "../../components/ui/EventCard";
import SectionTitle from "../../components/ui/SectionTitle";
import { Event, EventFilters } from "../../types";

// Mock data for events
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    description:
      "Deep dive into modern AI techniques and hands-on machine learning projects with industry experts.",
    department: "Computer Science",
    type: "tech",
    startAt: "2023-10-15T10:00:00",
    endAt: "2023-10-15T16:00:00",
    venue: "Computer Lab 201",
    capacity: 50,
    registeredCount: 32,
    images: [],
    tags: ["AI", "Machine Learning", "Workshop"],
  },
  {
    id: "2",
    title: "Robotics Innovation Challenge",
    description:
      "Build and program autonomous robots to solve real-world problems. Compete for prizes with your innovative solutions.",
    department: "Electronics",
    type: "tech",
    startAt: "2023-11-22T09:00:00",
    endAt: "2023-11-22T18:00:00",
    venue: "Engineering Workshop",
    capacity: 40,
    registeredCount: 28,
    images: [],
    tags: ["Robotics", "Innovation", "Competition"],
  },
  {
    id: "3",
    title: 'Cultural Fest 2023 - "Harmony"',
    description:
      "Celebrate diversity through music, dance, drama, and literature. Open to all departments and students.",
    department: "Cultural Affairs",
    type: "cultural",
    startAt: "2023-12-10T10:00:00",
    endAt: "2023-12-10T20:00:00",
    venue: "Main Auditorium",
    capacity: 500,
    registeredCount: 320,
    images: [],
    tags: ["Cultural", "Festival", "Performance"],
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    description:
      "Present your innovative business ideas to venture capitalists and win funding for your startup.",
    department: "Business",
    type: "other",
    startAt: "2024-01-15T14:00:00",
    endAt: "2024-01-15T18:00:00",
    venue: "Business Center Hall",
    capacity: 30,
    registeredCount: 18,
    images: [],
    tags: ["Startup", "Business", "Pitch"],
  },
  {
    id: "5",
    title: "Web Development Bootcamp",
    description:
      "Learn modern web development with React, Node.js, and MongoDB in this intensive bootcamp.",
    department: "Computer Science",
    type: "tech",
    startAt: "2023-11-05T09:00:00",
    endAt: "2023-11-07T17:00:00",
    venue: "Computer Lab 305",
    capacity: 35,
    registeredCount: 29,
    images: [],
    tags: ["Web Development", "React", "Bootcamp"],
  },
  {
    id: "6",
    title: "Photography Exhibition",
    description:
      "Showcase of student photography talent featuring landscapes, portraits, and abstract art.",
    department: "Fine Arts",
    type: "cultural",
    startAt: "2023-12-18T10:00:00",
    endAt: "2023-12-20T18:00:00",
    venue: "Art Gallery",
    capacity: 200,
    registeredCount: 85,
    images: [],
    tags: ["Photography", "Exhibition", "Arts"],
  },
  {
    id: "7",
    title: "Blockchain & Cryptocurrency Seminar",
    description:
      "Understand the fundamentals of blockchain technology and cryptocurrency markets.",
    department: "Business",
    type: "tech",
    startAt: "2024-02-08T14:00:00",
    endAt: "2024-02-08T17:00:00",
    venue: "Seminar Hall 2",
    capacity: 100,
    registeredCount: 42,
    images: [],
    tags: ["Blockchain", "Cryptocurrency", "Seminar"],
  },
  {
    id: "8",
    title: "Environmental Sustainability Workshop",
    description:
      "Learn about sustainable practices and how to implement eco-friendly solutions in daily life.",
    department: "Environmental Science",
    type: "workshop",
    startAt: "2024-01-25T10:00:00",
    endAt: "2024-01-25T15:00:00",
    venue: "Green Campus Center",
    capacity: 60,
    registeredCount: 38,
    images: [],
    tags: ["Environment", "Sustainability", "Workshop"],
  },
];

// Department options
const departments = [
  { key: "all", name: "All Departments" },
  { key: "computer-science", name: "Computer Science" },
  { key: "electronics", name: "Electronics" },
  { key: "business", name: "Business" },
  { key: "cultural-affairs", name: "Cultural Affairs" },
  { key: "fine-arts", name: "Fine Arts" },
  { key: "environmental-science", name: "Environmental Science" },
];

// Event type options
const eventTypes = [
  { key: "all", name: "All Types" },
  { key: "tech", name: "Tech" },
  { key: "arts", name: "Arts" },
  { key: "business", name: "Business" },
  { key: "workshop", name: "Workshop" },
  { key: "seminar", name: "Seminar" },
  { key: "competition", name: "Competition" },
  { key: "cultural", name: "Cultural" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const EventsPage: React.FC = () => {
  const [filters, setFilters] = React.useState<EventFilters>({});
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  const [isGridView, setIsGridView] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const eventsPerPage = 8;

  // Filter events based on search query and filters
  const filteredEvents = React.useMemo(() => {
    return mockEvents.filter((event) => {
      // Search query filter
      if (
        searchQuery &&
        !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Department filter
      if (
        selectedDepartment !== "all" &&
        event.department.toLowerCase().replace(" ", "-") !== selectedDepartment
      ) {
        return false;
      }

      // Event type filter
      if (selectedType !== "all" && event.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedDepartment, selectedType]);

  // Paginate events
  const paginatedEvents = React.useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return filteredEvents.slice(startIndex, startIndex + eventsPerPage);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (key: string) => {
    setSelectedDepartment(key);
    setCurrentPage(1);
  };

  const handleTypeChange = (key: string) => {
    setSelectedType(key);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("all");
    setSelectedType("all");
    setCurrentPage(1);
  };

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Explore Events"
          subtitle="Discover and register for upcoming events across all departments."
        />

        <Card className="border border-divider bg-content1 mb-8" shadow="none">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onValueChange={handleSearch}
                startContent={
                  <Icon icon="lucide:search" className="text-foreground-400" />
                }
                className="flex-grow"
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full sm:w-auto justify-between"
                      endContent={
                        <Icon
                          icon="lucide:chevron-down"
                          className="text-small"
                        />
                      }
                    >
                      {departments.find((d) => d.key === selectedDepartment)
                        ?.name || "Department"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Department selection"
                    selectionMode="single"
                    selectedKeys={[selectedDepartment]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      handleDepartmentChange(selected);
                    }}
                  >
                    {departments.map((dept) => (
                      <DropdownItem key={dept.key}>{dept.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full sm:w-auto justify-between"
                      endContent={
                        <Icon
                          icon="lucide:chevron-down"
                          className="text-small"
                        />
                      }
                    >
                      {eventTypes.find((t) => t.key === selectedType)?.name ||
                        "Event Type"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Event type selection"
                    selectionMode="single"
                    selectedKeys={[selectedType]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      handleTypeChange(selected);
                    }}
                  >
                    {eventTypes.map((type) => (
                      <DropdownItem key={type.key}>{type.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Button
                  variant="flat"
                  color="primary"
                  onPress={handleClearFilters}
                  className="w-full sm:w-auto"
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-foreground-400 text-sm">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredEvents.length}
                </span>{" "}
                events
              </p>

              <div className="flex gap-2">
                <Button
                  isIconOnly
                  variant={isGridView ? "solid" : "bordered"}
                  color={isGridView ? "primary" : "default"}
                  onPress={() => setIsGridView(true)}
                  aria-label="Grid view"
                >
                  <Icon icon="lucide:grid" />
                </Button>
                <Button
                  isIconOnly
                  variant={!isGridView ? "solid" : "bordered"}
                  color={!isGridView ? "primary" : "default"}
                  onPress={() => setIsGridView(false)}
                  aria-label="List view"
                >
                  <Icon icon="lucide:list" />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Icon
              icon="lucide:calendar-x"
              className="mx-auto text-foreground-300"
              width={48}
              height={48}
            />
            <h3 className="text-xl font-semibold mt-4">No events found</h3>
            <p className="text-foreground-400 mt-2">
              Try adjusting your filters or search query.
            </p>
            <Button
              color="primary"
              variant="flat"
              className="mt-4"
              onPress={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {isGridView ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
                key="grid-view"
              >
                {paginatedEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    <EventCard event={event} />
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
                {paginatedEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    <Card
                      className="border border-divider bg-content1"
                      shadow="none"
                    >
                      <CardBody className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 h-40 md:h-auto">
                            <img
                              src={
                                event.images[0] ||
                                `https://img.heroui.chat/image/ai?w=400&h=200&u=${event.id}`
                              }
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 md:p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-foreground font-semibold text-lg">
                                {event.title}
                              </h3>
                              <Chip
                                color={
                                  event.type === "tech"
                                    ? "success"
                                    : event.type === "arts"
                                    ? "secondary"
                                    : "warning"
                                }
                                variant="solid"
                                size="sm"
                              >
                                {event.type.charAt(0).toUpperCase() +
                                  event.type.slice(1)}
                              </Chip>
                            </div>

                            <p className="text-foreground-400 text-sm mb-4">
                              {event.description}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-auto">
                              <div className="flex items-center gap-2 text-foreground-400 text-sm">
                                <Icon icon="lucide:calendar" width={16} />
                                <span>
                                  {new Date(event.startAt).toLocaleDateString()}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-foreground-400 text-sm">
                                <Icon icon="lucide:clock" width={16} />
                                <span>
                                  {new Date(event.startAt).toLocaleTimeString(
                                    "en-US",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    }
                                  )}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-foreground-400 text-sm">
                                <Icon icon="lucide:map-pin" width={16} />
                                <span>{event.venue}</span>
                              </div>

                              <div className="flex items-center gap-2 text-foreground-400 text-sm">
                                <Icon icon="lucide:users" width={16} />
                                <span>
                                  {event.registeredCount}/{event.capacity}{" "}
                                  registered
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <Button
                                color="primary"
                                as="a"
                                href={`/events/${event.id}`}
                              >
                                Register Now
                              </Button>
                            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
