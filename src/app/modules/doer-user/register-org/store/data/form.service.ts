import { Injectable } from "@angular/core";
import { SaveFormFn, LoadFormFn, HttpService, DisplayErrorFn } from "../../../../../libs/doer-ngx-core";
import { ok } from "../../../../../libs/doer-core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/Observable/of";


@Injectable()
export class FormService {

    constructor(private readonly httpService: HttpService) {
    }

    load: LoadFormFn = ({data}) => {
        // accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9UTkZSRFUyTUVKRU1qRTRRelV3UlRRMFFUZ3pSa1pHTjBaRk5UUkVPRFZEUVRRMk1VWkJRZyJ9.eyJodHRwczovL2RvZXIuYXV0aC5jb20vb3JnSWQiOiIwZjRjN2JiYS1iMWIyLTQ5NjAtOTJhYy1iZDlmNmJlZGI1M2UiLCJodHRwczovL2RvZXIuYXV0aC5jb20vcm9sZSI6Ik93bmVyIiwiaXNzIjoiaHR0cHM6Ly9kb2VyLXN0YWdlLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHxkb2VyfDIwZjE1NTZiLTQ0MmUtNGEyZC1iZDdlLWY4MTZlM2MxZmIzYyIsImF1ZCI6WyJodHRwczovL2RvZXItc3RhZ2UvIiwiaHR0cHM6Ly9kb2VyLXN0YWdlLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1MjIxNzYyNDgsImV4cCI6MTUyMjI2MjY0OCwiYXpwIjoiUVRWc3FtYXQwNmhUUVFlYXZwUjJqN1NVdUJpakkyTG0iLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiZ3R5IjoicGFzc3dvcmQifQ.fb1_aduAcLPEPJuuyr2C4DxatQwyRpmzQqkrC0JGB2cRrg3GUh_Ryj0YiNWwJnQK0yVUIwTL8ooV83N_jT8uxMo4qf248KOr3Zsvgz8K9aSmbOG5t2B9f-nus0XJl9eBV32FmQkl0ynLoupCtaPreRpf03fb4V6QTSQ0rU6J3BRZtvY_1Iopdhgx3Yea2cGTybsbPSxc7t2sa3VJ-Pjl7jnh5Omb9CdJWbe8ISSWX8bsnPZY1mEXGA2l0vJusPwg8csTfz9Wlx1XImsDhFSOelN0dwwsdirQUVXouaMcMG43_vFAXQvQ0kgBC3QZmjqMIj_G5jrkvV6YLbVKbpZHBQ'
        // idToken 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9UTkZSRFUyTUVKRU1qRTRRelV3UlRRMFFUZ3pSa1pHTjBaRk5UUkVPRFZEUVRRMk1VWkJRZyJ9.eyJodHRwczovL2RvZXIuYXV0aC5jb20vbmFtZSI6IjExMSAxMTEgMTExIiwiaHR0cHM6Ly9kb2VyLmF1dGguY29tL2F2YXRhciI6Imh0dHBzOi8vaW1hZ2UuZmxhdGljb24uY29tL2ljb25zL3N2Zy8xNDkvMTQ5MDcxLnN2ZyIsIm5pY2tuYW1lIjoibWF4MTMyNCIsIm5hbWUiOiJtYXgxMzI0QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9iYWI2NDhhOWQ0NTUwMzNkYjkwOTE0NzM5ZDYzYjE4Nj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRm1hLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE4LTAzLTI3VDE4OjQ0OjA4LjA3OVoiLCJpc3MiOiJodHRwczovL2RvZXItc3RhZ2UuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfGRvZXJ8MjBmMTU1NmItNDQyZS00YTJkLWJkN2UtZjgxNmUzYzFmYjNjIiwiYXVkIjoiUVRWc3FtYXQwNmhUUVFlYXZwUjJqN1NVdUJpakkyTG0iLCJpYXQiOjE1MjIxNzYyNDgsImV4cCI6MTUyMjIxMjI0OH0.fdV7j2osIYqgSIAEgW-AFiWiaKop_7KAr2WKMKwj3Kb_kAb3vRroNeRhUElXeZ_IDG5B2CVCIOyxeFGSOCNVBgBxK4zCNtrEUeSiSs_jp9yCev5hjQT0YLsOrOP3LtGcI39y1A5-mZgGMha1oJCFXwtMfIx_eto9gkidpZF24wjYDsI_IPUG-q4R3RzaMrkMfBjEyCZ7-AFBf9qIX-c4ZvMyFKdf5Qo2j2DUvcsDgGB_tmQXKCXTCI0H7nxGsEdEbfua7V8y-py-xgIagS-0KUkhgiMm7Ke5AWcQLeMenCK0uLgwD6ExtvRQW0auGlu7W93bNU2SH9F-GrM4Sx9gew'
        return of(ok({}));
    }

    save: SaveFormFn = ({data}) =>
        this.httpService.post('register-org', {...data.data, avatar: 'https://image.flaticon.com/icons/svg/149/149071.svg' })

}