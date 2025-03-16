// src/components/ui/Accordion.tsx
import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <button
        onClick={onClick}
        className="w-full text-left px-5 py-4 flex items-center justify-between focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronRightIcon
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-90" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
  items: {
    id: string | number;
    title: string;
    content: React.ReactNode;
  }[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState<(string | number)[]>([]);

  const toggleItem = (id: string | number) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      if (allowMultiple) {
        setOpenItems([...openItems, id]);
      } else {
        setOpenItems([id]);
      }
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openItems.includes(item.id)}
          onClick={() => toggleItem(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
