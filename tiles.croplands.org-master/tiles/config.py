import os
import json
import base64

os.environ[
    'GOOGLE_SERVICE_ACCOUNT_ENC'] = 'eyJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5LzYwNDg2MTAyMjc4MS1jb21wdXRlJTQwZGV2ZWxvcGVyLmdzZXJ2aWNlYWNjb3VudC5jb20iLCAiYXV0aF91cmkiOiAiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgiLCAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdkFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLWXdnZ1NpQWdFQUFvSUJBUUNtWWtpN1RnK3RNT0JGXG5QNVpDZFR2RUxtdzBlSjBEeEpKNFY4UU1lRVk0UnBSaGlnVHJSYUJnU0tEb0p1cmVRcUYxWWdJcVVMeG9SMzlkXG5kejR1K2FiSmZHRHFNc1F4Vk5iaEZCWlE3aXE2azVFU0RGUEk5emV6SS9QL2J5Q1ZKQnRhdVFPZTJBcXh5MVVGXG53NVZHazNadjF6ZWlvUnNZUncxVnpQZ0JGL0duSW56dlVYN1l3T0JTT3JiU2NHSFU2V3hRZGhUQTF2ZlRQbnFkXG5SUVFUL1ZpR0hLcmVsUU1VUDZjaC9VdmpDRzR1SXV6L1AvME9US2paUVhJVjllUmhxdVFhV3Z2UUk1a3lyemorXG5vcjA3VUkxSzl6WGlXb2luZEszS0llTjBMbU9EYXRqbythMVFkOTZ6MUZ6ZThBSlVBR0YyWjFnNDNVcXI1WnRJXG55bkhFdHR4ekFnTUJBQUVDZ2dFQUVEeEk4cFlFYTViNFcybUFCUTRoZmR3MXpNejBMVmp5SGZJYWZFa0VPUnVTXG5BUTZSdWs5NS9jczRnRTdEM2xwTUhRTXFTT3pGNWJzTVQ1ZUNKdDFQakJ1cDdWQjAyb2QzekZERWVMTTAwaTN5XG5HdnUrOVQ1Q1hpV2srb2ppZWdzaTdEQmZqUkZ4d2JXZ24wWmRlNXlLRXhIQ0tRbGxkbklBZUIzZkdXUTN2V0kwXG54WVNZNmp3a0xuRWdwR2o0ZjFpV3Z3LzYveGdxU1RZV0hLWVBWMlpoeitsRENEVER0UVFzUndUUmFqRCtLYWNxXG54R1NRZVVTWGJPTTRxZXpGU05zTEJ1YzBNMDAxMC9qaHFIR0YzUWZoWE11VDc2a1FLbEpzU2xxSmgyZUxHSElJXG4xZXFFL3B6V2FxSTcvOFlvZDlnYlhoMkJLQjU5SXRENUhDbkpFUlM4a1FLQmdRRGMrbGxKMHVXbmVPMWZ3M05TXG5rdGFNMi9YZ25xTTNXZk1nYnkvcUxJcm9xT2w0WTMwRXF3ZXAxRmNwaUNreEZza1JvSFBzOC93OVVHNHpXSmRFXG5zaFNQVmpPVmZkYUZpajd1SmRrU2wyWmpJeHBtblpRVlNsdFJVYnhORFRHb0V0UWhSdVR0RjYzU3NFWWRhbkRlXG5aZk5ZT0pwclBDVnd6TTNtN1EvNkw0SndTd0tCZ1FEQXdPb0V5cnBXK0JMa0czUW9CbGYya1N5VGNmQWZzWEY5XG5OODJiRVF6eS9xbkZxRGVVK2pkL1VUVTZpSkpJeTJZQ2RWeUtobStkMytoSGltNjFQTmd2OElvU21Jb2VpZ2JJXG41RzM3ajdXTVBzMkhTR3NHdEJBLzVadnFKbW4xSUJTayt3UXVkbkd5WFhDWmNlMm9NWERKR2pmQ0lQWHQ2amVJXG5SMGJPdkh1N2VRS0JnQkdhckNSU2RkTTZzZ1p3QnE3c1hjVkkvTFNSVHNWcEdCSmNhVC9KbnFOY1dZVXF2OW53XG5XaUx3ZEtVdFlNSzFZdjFSZ0FxL2dUZk5RWW83bzRsb2VuVFUxRFV6bWpSM1IvNG02NzBzYkk2M1RESWltWnA4XG5tdnZHZkM3VFAwSjVoWWJGSkJXelRqaTdyRXBKb1laR0x2VzNSSzRJVTU5QjRhRmsvMkhhQ1JVekFvR0FQSXNiXG50bCtiQWdBdnB0aDh0cW12YlhJU0Iwb05lMWIzNTdYa2JlV0FKTDhhd2t2aEVYazZmMUlabndZUXRLNjJudVVRXG5LUzZxMW5MaStiMmdvbXEzR08rNzNyVnRCTVNqOXV2UkkrZnl4VmRncFRKNDg0VVJhWkNNVlpLMVMxcEZRY0RhXG5nbUdQdXMrZ3M0SFdmVEx5VXloYUJTN25NRkNXR3NjUWxaVWNaRGtDZ1lBK2FodTZ2WkZsRFN5VHkzaWc5ZnEyXG5zTDV4U2ppekkrOXcrM1lFN2FwN1ZnTFFIcC9KeU82eUtlYW9TdnNicjkxQ01kNkszbWQvMkcxcFMrblExd0dwXG5ndDJBdy9naTlrRXVNbktNMU0zck0rS0V2eE9XWjlYYWtqQnRGYXVrUElOam5sNVhwUUpHUEtqVVJoZHF0czhZXG5QWnFWTU9ZbW9GR1NTZkhKTTVXTzhRPT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsICJjbGllbnRfZW1haWwiOiAiNjA0ODYxMDIyNzgxLWNvbXB1dGVAZGV2ZWxvcGVyLmdzZXJ2aWNlYWNjb3VudC5jb20iLCAicHJpdmF0ZV9rZXlfaWQiOiAiYzg5ZGY3OWJiZWJiODZiNWNjNDA2ZDg4OGMyZDQzNzMyOTgwNzY5NSIsICJjbGllbnRfaWQiOiAiMTAyNDUzMTIwNzk4MDQ2MDA3NTMyIiwgInRva2VuX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW4iLCAicHJvamVjdF9pZCI6ICJ0aGlua2luZy1zdGFyLTE0MDYwMiIsICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsICJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIn0='
GOOGLE_SERVICE_ACCOUNT = json.loads(
    base64.b64decode(os.environ.get('GOOGLE_SERVICE_ACCOUNT_ENC')).decode('utf-8'))
GOOGLE_SERVICE_ACCOUNT_SCOPES = ['https://www.googleapis.com/auth/fusiontables',
                                 'https://www.googleapis.com/auth/earthengine']

CACHE_TYPE = 'redis'
# os.environ['REDIS_URL'] = 'redis://croplands-tiles-dev.wr.usgs.gov:30008'
os.environ['REDIS_URL'] = 'redis://croplands-db.croplands.svc.cluster.local:6379'
CACHE_REDIS_URL = os.environ.get('REDIS_URL')

TILE_CACHE_SIZE_LIMIT = 2 ** 30 * 10  # 10GB
TILE_CACHE_EVICTION = 'least-recently-used'
TILE_CACHE_EXPIRATION = 3600 * 24 * 100  # 100 days
TILE_CACHE_SHARDS = 16