import React from "react";
import { Filter, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Select } from "@radix-ui/react-select";
import { categories, transactionTypes } from "../../utils/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface TransactionFiltersProps {
  filters: {
    category?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
}

export function TransactionFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: TransactionFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ""
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </CardTitle>
        <CardDescription>
          Filter your transactions by various criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Type Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Select
              value={filters.type || ""}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <option value="">All Types</option>
              {transactionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select
              value={filters.category || ""}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>

          {/* Start Date Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">From Date</label>
            <Input
              type="date"
              value={filters.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">To Date</label>
            <Input
              type="date"
              value={filters.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
