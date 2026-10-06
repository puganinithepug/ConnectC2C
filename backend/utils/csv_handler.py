import csv
import json
import os
from datetime import datetime, timedelta
from typing import Optional, Dict, List

class CSVHandler:
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.fieldnames = [
            'id', 'email', 'password_hash', 'mode', 'profile_json',
            'behavioral_prefs_json', 'search_history_json', 'posts_json',
            'messages_json', 'created_at', 'last_activity'
        ]
        self._ensure_csv_exists()
    
    def _ensure_csv_exists(self):
        """Create CSV with headers if it doesn't exist."""
        if not os.path.exists(self.csv_path):
            os.makedirs(os.path.dirname(self.csv_path), exist_ok=True)
            with open(self.csv_path, 'w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=self.fieldnames)
                writer.writeheader()
    
    def _read_all_rows(self) -> List[Dict]:
        """Read all rows from CSV."""
        rows = []
        with open(self.csv_path, 'r', newline='') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        return rows
    
    def _write_all_rows(self, rows: List[Dict]):
        """Write all rows to CSV."""
        with open(self.csv_path, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=self.fieldnames)
            writer.writeheader()
            writer.writerows(rows)
    
    def get_user_by_id(self, user_id: str) -> Optional[Dict]:
        """Get a user by ID."""
        rows = self._read_all_rows()
        for row in rows:
            if row['id'] == user_id:
                return self._deserialize_user(row)
        return None
    
    def get_user_by_email(self, email: str) -> Optional[Dict]:
        """Get a user by email."""
        rows = self._read_all_rows()
        for row in rows:
            if row['email'] == email:
                return self._deserialize_user(row)
        return None
    
    def create_user(self, user_data: Dict) -> Dict:
        """Create a new user."""
        rows = self._read_all_rows()
        
        # Serialize nested data
        user_data['profile_json'] = json.dumps(user_data.get('profile_json', {}))
        user_data['behavioral_prefs_json'] = json.dumps(user_data.get('behavioral_prefs_json', {}))
        user_data['search_history_json'] = json.dumps(user_data.get('search_history_json', {'searches': []}))
        user_data['posts_json'] = json.dumps(user_data.get('posts_json', []))
        user_data['messages_json'] = json.dumps(user_data.get('messages_json', []))
        
        rows.append(user_data)
        self._write_all_rows(rows)
        return self._deserialize_user(user_data)
    
    def update_user(self, user_id: str, updates: Dict) -> Optional[Dict]:
        """Update a user by ID."""
        rows = self._read_all_rows()
        
        for i, row in enumerate(rows):
            if row['id'] == user_id:
                # Merge updates
                for key, value in updates.items():
                    if key in ['profile_json', 'behavioral_prefs_json', 'search_history_json', 'posts_json', 'messages_json']:
                        row[key] = json.dumps(value) if isinstance(value, dict) else value
                    else:
                        row[key] = value
                
                row['last_activity'] = str(int(datetime.now().timestamp()))
                rows[i] = row
                self._write_all_rows(rows)
                return self._deserialize_user(row)
        
        return None
    
    def _deserialize_user(self, row: Dict) -> Dict:
        """Convert CSV row to user object with deserialized JSON fields."""
        return {
            'id': row['id'],
            'email': row['email'],
            'password_hash': row['password_hash'],
            'mode': row['mode'],
            'profile': json.loads(row['profile_json']),
            'behavioral_prefs': json.loads(row['behavioral_prefs_json']),
            'search_history': json.loads(row['search_history_json']),
            'posts': json.loads(row['posts_json']),
            'messages': json.loads(row['messages_json']),
            'created_at': int(row['created_at']),
            'last_activity': int(row['last_activity'])
        }
    
    def get_all_users(self) -> List[Dict]:
        """Get all users (for demo/testing)."""
        rows = self._read_all_rows()
        return [self._deserialize_user(row) for row in rows]

