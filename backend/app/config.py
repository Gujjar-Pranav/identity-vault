from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"

    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str

    SECRET_KEY: str

    DATABASE_URL: str

    FRONTEND_URL: str = "http://localhost:3000"
    BACKEND_URL: str = "http://localhost:8000"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() == "production"

    @property
    def normalized_database_url(self) -> str:
        """
        Render/Neon may provide URLs starting with postgres://.
        SQLAlchemy expects postgresql+psycopg2:// for psycopg2.
        """
        if self.DATABASE_URL.startswith("postgres://"):
            return self.DATABASE_URL.replace(
                "postgres://",
                "postgresql+psycopg2://",
                1,
            )

        if self.DATABASE_URL.startswith("postgresql://"):
            return self.DATABASE_URL.replace(
                "postgresql://",
                "postgresql+psycopg2://",
                1,
            )

        return self.DATABASE_URL


settings = Settings()