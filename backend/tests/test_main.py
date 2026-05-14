from fastapi.testclient import TestClient

from app.main import app
from app.utils.id_generator import generate_user_id

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["success"] is True
    assert response.json()["message"] == "Identity Vault API is running"


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["service"] == "identity-vault-api"


def test_invalid_lookup_returns_try_again():
    response = client.get("/api/users/lookup/INVALID-ID")

    assert response.status_code == 200
    assert response.json()["success"] is False
    assert response.json()["message"] == "Try Again"
    assert response.json()["data"] is None


def test_generated_user_id_format():
    generated_id = generate_user_id()

    assert generated_id.startswith("GID-")
    assert len(generated_id) == 12
