#!/bin/bash

folder_path="/root/bin/mongodumptotal2"
log_file="/root/us850_logs.log"

# Function to check if a folder follows the specified criteria
check_folder() {
    local folder_name=$1
    local test=0

    # Extract the date part
    date_part=${folder_name#test_}

        # Check if it's the first day of the month
        if [ "$(date -d "$date_part" +%d)" -eq 01 ]; then
            echo "Folder '$folder_name' is a backup for the first day of the month. Keeping it." >> "$log_file"
        ((test++))
        fi
        # Check if it is the month of december and it is the first day of the week
        if [ "$(date -d "$date_part" +%m)" -eq 12 ] &&  [ "$(date -d "$date_part" +%u)" -eq 1 ]; then
            echo "Folder '$folder_name' is a backup for the first day of December. Keeping it." >> "$log_file"
        ((test++))
        fi
        # Check if it's the last week of the year
        if [ "$(date -d "$date_part" +%W)" -eq 52 ]; then
         echo "Folder '$folder_name' is a backup for the last week of the year. Keeping it." >> "$log_file"
        ((test++))
        fi
        if [ $test -eq 0 ]; then
          echo "Deleting folder '$folder_name' because it does not follows the specificied criteria."
          rm -rf "$folder_path/$folder_name"
        fi
}

# Check if the folder exists
if [ -d "$folder_path" ]; then
    echo "Checking folders in $folder_path..."

    # Loop through each subfolder in the specified path
    for subfolder in "$folder_path"/*; do
        # Extract the folder name
        folder_name=$(basename "$subfolder")

        # Check the folder against the criteria
        check_folder "$folder_name"
    done
else
    echo "Error: Folder $folder_path does not exist."
fi