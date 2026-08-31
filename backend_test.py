#!/usr/bin/env python3
"""
Backend API Test Suite for LEONIDA ARCHIVE
Tests the template MongoDB status API endpoints
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from .env
BASE_URL = "https://leonida-fan.preview.emergentagent.com/api"

def print_test_header(test_name):
    """Print a formatted test header"""
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(success, message):
    """Print test result"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

def test_get_api_root():
    """Test 1: GET /api/root → 200, JSON {"message":"Hello World"}"""
    print_test_header("GET /api/root")
    
    try:
        response = requests.get(f"{BASE_URL}/root", timeout=30)
        
        # Check status code
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        # Check JSON response
        data = response.json()
        if data.get("message") != "Hello World":
            print_result(False, f"Expected message 'Hello World', got {data}")
            return False
        
        # Check CORS header
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        if not cors_header:
            print_result(False, "Missing CORS header 'Access-Control-Allow-Origin'")
            return False
        
        print_result(True, f"Status: {response.status_code}, Response: {data}, CORS: {cors_header}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_get_api_slash():
    """Test 2: GET /api/ → 200, JSON {"message":"Hello World"}"""
    print_test_header("GET /api/")
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=30)
        
        # Check status code
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        # Check JSON response
        data = response.json()
        if data.get("message") != "Hello World":
            print_result(False, f"Expected message 'Hello World', got {data}")
            return False
        
        # Check CORS header
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        if not cors_header:
            print_result(False, "Missing CORS header 'Access-Control-Allow-Origin'")
            return False
        
        print_result(True, f"Status: {response.status_code}, Response: {data}, CORS: {cors_header}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_post_status_valid():
    """Test 3: POST /api/status with valid body → 200, JSON with id, client_name, timestamp"""
    print_test_header("POST /api/status with valid body")
    
    try:
        payload = {"client_name": "leonida-test"}
        response = requests.post(
            f"{BASE_URL}/status",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        # Check status code
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
        
        # Check JSON response
        data = response.json()
        
        # Verify required fields
        if "id" not in data:
            print_result(False, f"Missing 'id' field in response: {data}")
            return False, None
        
        if data.get("client_name") != "leonida-test":
            print_result(False, f"Expected client_name 'leonida-test', got {data.get('client_name')}")
            return False, None
        
        if "timestamp" not in data:
            print_result(False, f"Missing 'timestamp' field in response: {data}")
            return False, None
        
        # Check CORS header
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        if not cors_header:
            print_result(False, "Missing CORS header 'Access-Control-Allow-Origin'")
            return False, None
        
        print_result(True, f"Status: {response.status_code}, Response: {data}, CORS: {cors_header}")
        return True, data.get("id")
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False, None

def test_get_status(expected_id=None):
    """Test 4: GET /api/status → 200, JSON array without _id field"""
    print_test_header("GET /api/status")
    
    try:
        response = requests.get(f"{BASE_URL}/status", timeout=30)
        
        # Check status code
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        # Check JSON response
        data = response.json()
        
        if not isinstance(data, list):
            print_result(False, f"Expected array response, got {type(data)}")
            return False
        
        # Check if the record we created exists
        if expected_id:
            found = False
            for record in data:
                if record.get("id") == expected_id:
                    found = True
                    # Verify no _id field
                    if "_id" in record:
                        print_result(False, f"Found MongoDB '_id' field in record: {record}")
                        return False
                    break
            
            if not found:
                print_result(False, f"Could not find record with id {expected_id} in response")
                return False
        
        # Check CORS header
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        if not cors_header:
            print_result(False, "Missing CORS header 'Access-Control-Allow-Origin'")
            return False
        
        print_result(True, f"Status: {response.status_code}, Found {len(data)} records, No _id fields, CORS: {cors_header}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_post_status_empty_body():
    """Test 5: POST /api/status with empty body → 400 with error JSON"""
    print_test_header("POST /api/status with empty body")
    
    try:
        payload = {}
        response = requests.post(
            f"{BASE_URL}/status",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        # Check status code
        if response.status_code != 400:
            print_result(False, f"Expected status 400, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        # Check JSON response has error field
        data = response.json()
        if "error" not in data:
            print_result(False, f"Expected 'error' field in response: {data}")
            return False
        
        # Check CORS header
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        if not cors_header:
            print_result(False, "Missing CORS header 'Access-Control-Allow-Origin'")
            return False
        
        print_result(True, f"Status: {response.status_code}, Error: {data.get('error')}, CORS: {cors_header}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_unknown_route():
    """Test 6: GET /api/unknown-route → 404 with error JSON"""
    print_test_header("GET /api/unknown-route")
    
    try:
        response = requests.get(f"{BASE_URL}/unknown-route", timeout=30)
        
        # Check status code
        if response.status_code != 404:
            print_result(False, f"Expected status 404, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        # Check JSON response has error field
        data = response.json()
        if "error" not in data:
            print_result(False, f"Expected 'error' field in response: {data}")
            return False
        
        # Check CORS header
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        if not cors_header:
            print_result(False, "Missing CORS header 'Access-Control-Allow-Origin'")
            return False
        
        print_result(True, f"Status: {response.status_code}, Error: {data.get('error')}, CORS: {cors_header}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("LEONIDA ARCHIVE - Backend API Test Suite")
    print(f"Testing: {BASE_URL}")
    print("="*80)
    
    results = []
    
    # Test 1: GET /api/root
    results.append(("GET /api/root", test_get_api_root()))
    
    # Test 2: GET /api/
    results.append(("GET /api/", test_get_api_slash()))
    
    # Test 3: POST /api/status with valid body
    success, created_id = test_post_status_valid()
    results.append(("POST /api/status (valid)", success))
    
    # Test 4: GET /api/status
    results.append(("GET /api/status", test_get_status(created_id)))
    
    # Test 5: POST /api/status with empty body
    results.append(("POST /api/status (empty)", test_post_status_empty_body()))
    
    # Test 6: GET unknown route
    results.append(("GET /api/unknown-route", test_unknown_route()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("="*80)
    
    # Exit with appropriate code
    sys.exit(0 if passed == total else 1)

if __name__ == "__main__":
    main()
